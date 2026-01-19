import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PromptComparisonProps {
  original: string;
  improved: string;
  changes: string[];
}

export function PromptComparison({
  original,
  improved,
  changes,
}: PromptComparisonProps) {
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedImproved, setCopiedImproved] = useState(false);

  const copyToClipboard = async (
    text: string,
    type: "original" | "improved",
  ) => {
    await navigator.clipboard.writeText(text);
    if (type === "original") {
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2000);
    } else {
      setCopiedImproved(true);
      setTimeout(() => setCopiedImproved(false), 2000);
    }
    toast({
      title: "Copied!",
      description: `${type === "original" ? "Original" : "Improved"} prompt copied to clipboard`,
    });
  };

  if (!original && !improved) {
    return null;
  }

  return (
    <div className="space-y-4 animate-slide-up">
      {changes.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl glass">
          <span className="text-sm font-medium text-muted-foreground">
            Improvements:
          </span>
          {changes.map((change, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs rounded-lg bg-primary/10 text-primary border-0"
            >
              ✨ {change}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="glass rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <div className="p-1.5 rounded-lg bg-muted">
                  <FileText className="h-3.5 w-3.5" />
                </div>
                Original Prompt
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(original, "original")}
                disabled={!original}
                className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
              >
                {copiedOriginal ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
              {original || "Enter a prompt to see the comparison"}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl overflow-hidden relative group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 gradient-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <CardHeader className="pb-3 border-b border-primary/20 relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="gradient-text">Improved Prompt</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(improved, "improved")}
                disabled={!improved}
                className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10"
              >
                {copiedImproved ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 relative">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {improved || "Your improved prompt will appear here"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
