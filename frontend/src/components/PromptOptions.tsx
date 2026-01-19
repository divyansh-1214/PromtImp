import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UseCase, Tone, OutputFormat } from "@/lib/promptEnhancer";
import {
  Code,
  GraduationCap,
  FileText,
  Briefcase,
  Palette,
  Rocket,
  Bot,
  MessageSquare,
  ListOrdered,
} from "lucide-react";

interface PromptOptionsProps {
  useCase: UseCase;
  tone: Tone;
  format: OutputFormat;
  onUseCaseChange: (value: UseCase) => void;
  onToneChange: (value: Tone) => void;
  onFormatChange: (value: OutputFormat) => void;
}

const useCaseOptions: {
  value: UseCase;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: "coding",
    label: "Coding",
    icon: <Code className="h-4 w-4" />,
    color: "text-blue-500",
  },
  {
    value: "academic",
    label: "Academic",
    icon: <GraduationCap className="h-4 w-4" />,
    color: "text-purple-500",
  },
  {
    value: "content",
    label: "Content",
    icon: <FileText className="h-4 w-4" />,
    color: "text-green-500",
  },
  {
    value: "resume",
    label: "Resume",
    icon: <Briefcase className="h-4 w-4" />,
    color: "text-amber-500",
  },
  {
    value: "uiux",
    label: "UI/UX",
    icon: <Palette className="h-4 w-4" />,
    color: "text-pink-500",
  },
  {
    value: "startup",
    label: "Startup",
    icon: <Rocket className="h-4 w-4" />,
    color: "text-orange-500",
  },
  {
    value: "ai-prompting",
    label: "AI Prompting",
    icon: <Bot className="h-4 w-4" />,
    color: "text-cyan-500",
  },
];

const toneOptions: { value: Tone; label: string }[] = [
  { value: "formal", label: "🎩 Formal" },
  { value: "casual", label: "😊 Casual" },
  { value: "academic", label: "📚 Academic" },
  { value: "professional", label: "💼 Professional" },
  { value: "creative", label: "🎨 Creative" },
];

const formatOptions: { value: OutputFormat; label: string }[] = [
  { value: "bullets", label: "• Bullet Points" },
  { value: "steps", label: "1. Step-by-Step" },
  { value: "long", label: "📝 Long Answer" },
  { value: "short", label: "⚡ Short Answer" },
  { value: "code", label: "</> Code Only" },
];

export function PromptOptions({
  useCase,
  tone,
  format,
  onUseCaseChange,
  onToneChange,
  onFormatChange,
}: PromptOptionsProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in"
      style={{ animationDelay: "0.1s" }}
    >
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-semibold">
          <div className="p-1.5 rounded-lg bg-blue-500/10">
            <Bot className="h-3.5 w-3.5 text-blue-500" />
          </div>
          Use Case
        </Label>
        <Select value={useCase} onValueChange={onUseCaseChange}>
          <SelectTrigger className="glass glass-hover rounded-xl h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass rounded-xl border-border/50">
            {useCaseOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className={option.color}>{option.icon}</span>
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-semibold">
          <div className="p-1.5 rounded-lg bg-purple-500/10">
            <MessageSquare className="h-3.5 w-3.5 text-purple-500" />
          </div>
          Tone
        </Label>
        <Select value={tone} onValueChange={onToneChange}>
          <SelectTrigger className="glass glass-hover rounded-xl h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass rounded-xl border-border/50">
            {toneOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="rounded-lg"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-semibold">
          <div className="p-1.5 rounded-lg bg-green-500/10">
            <ListOrdered className="h-3.5 w-3.5 text-green-500" />
          </div>
          Output Format
        </Label>
        <Select value={format} onValueChange={onFormatChange}>
          <SelectTrigger className="glass glass-hover rounded-xl h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass rounded-xl border-border/50">
            {formatOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="rounded-lg"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
