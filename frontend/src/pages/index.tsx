import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { PromptInput } from "@/components/PromptInput";
import { PromptOptions } from "@/components/PromptOptions";
import { PromptComparison } from "@/components/PromptComparison";
import { PromptScoreCard } from "@/components/PromptScore";
import { AISuggestions } from "@/components/AISuggestions";
import { PromptHistory } from "@/components/PromptHistory";
import { TemplateLibrary } from "@/components/TemplateLibrary";
import { ExportActions } from "@/components/ExportActions";
import { Button } from "@/components/ui/button";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import axios from "axios";
import type {
  UseCase,
  Tone,
  OutputFormat,
  EnhancementResult,
  PromptHistoryItem,
} from "@/lib/promptEnhancer";
import { enhancePrompt } from "@/lib/promptEnhancer";
import type { PromptTemplate } from "@/lib/templates";
import { Wand2, Sparkles, Zap } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [useCase, setUseCase] = useState<UseCase>("coding");
  const [tone, setTone] = useState<Tone>("professional");
  const [format, setFormat] = useState<OutputFormat>("long");
  const [result, setResult] = useState<EnhancementResult | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { history, addToHistory, removeFromHistory, clearAllHistory } =
    usePromptHistory();

  const handleEnhance = useCallback(() => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    setTimeout(() => {
      const enhanced = enhancePrompt(prompt, useCase, tone, format);
      setResult(enhanced);
      setIsEnhancing(false);
    }, 600);
  }, [prompt, useCase, tone, format]);
  const handleSave = useCallback(() => {
    if (!result || !prompt.trim()) return;
    addToHistory({
      original: prompt,
      improved: result.improved,
      useCase,
      tone,
      format,
      score: result.score,
    });
  }, [prompt, result, useCase, tone, format, addToHistory]);

  const handleRestoreHistory = useCallback((item: PromptHistoryItem) => {
    setPrompt(item.original);
    setUseCase(item.useCase);
    setTone(item.tone);
    setFormat(item.format);
    setResult({
      improved: item.improved,
      score: item.score,
      suggestions: [],
      changes: [],
    });
  }, []);

  const handleSelectTemplate = useCallback((template: PromptTemplate) => {
    setPrompt(template.prompt);
    setUseCase(template.useCase);
    setTone(template.tone);
    setFormat(template.format);
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>
      <Header />
      <main className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="space-y-6">
              <PromptInput value={prompt} onChange={setPrompt} />
              <PromptOptions
                useCase={useCase}
                tone={tone}
                format={format}
                onUseCaseChange={setUseCase}
                onToneChange={setTone}
                onFormatChange={setFormat}
              />
              <div
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <Button
                  onClick={handleEnhance}
                  disabled={!prompt.trim() || isEnhancing}
                  className="gap-2 rounded-xl h-12 px-6 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden group"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    {isEnhancing ? (
                      <>
                        <Sparkles className="h-5 w-5 animate-pulse" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-5 w-5" />
                        Improve Prompt
                        <Zap className="h-4 w-4" />
                      </>
                    )}
                  </span>
                </Button>

                <ExportActions
                  original={prompt}
                  improved={result?.improved || ""}
                  onSave={handleSave}
                  history={history}
                />
              </div>
            </div>

            {/* Comparison Section */}
            {result && (
              <PromptComparison
                original={prompt}
                improved={result.improved}
                changes={result.changes}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {result && (
              <>
                <PromptScoreCard score={result.score} />
                <AISuggestions suggestions={result.suggestions} />
              </>
            )}
            <TemplateLibrary onSelectTemplate={handleSelectTemplate} />
            <PromptHistory
              history={history}
              onRestore={handleRestoreHistory}
              onDelete={removeFromHistory}
              onClearAll={clearAllHistory}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-16 relative">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="gradient-text font-semibold">
              Prompt Improver AI
            </span>{" "}
            — Transform your ideas into powerful, actionable prompts
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
