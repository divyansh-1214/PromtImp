import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Type } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function PromptInput({ value, onChange, placeholder }: PromptInputProps) {
  const wordCount = value.split(/\s+/).filter(Boolean).length;
  
  return (
    <div className="space-y-3 animate-fade-in">
      <Label className="flex items-center gap-2 text-sm font-semibold">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        Your Raw Prompt
      </Label>
      <div className="relative group">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Enter your prompt here... e.g., 'Write a function to sort an array'"}
          className="min-h-[180px] resize-none glass glass-hover rounded-xl text-base leading-relaxed placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
      </div>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Type className="h-3.5 w-3.5" />
          <span>{value.length} characters</span>
          <span className="text-border">•</span>
          <span>{wordCount} words</span>
        </div>
        {wordCount > 0 && (
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${wordCount < 5 ? 'bg-destructive' : wordCount < 15 ? 'bg-yellow-500' : 'bg-green-500'}`} />
            <span className="text-xs text-muted-foreground">
              {wordCount < 5 ? 'Too short' : wordCount < 15 ? 'Good start' : 'Great length'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
