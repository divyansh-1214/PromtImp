import { Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="relative p-3 rounded-xl bg-primary/10 glow-sm group hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-6 w-6 text-primary animate-float" />
            <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="gradient-text">Prompt Improver</span>{' '}
              <span className="text-foreground">AI</span>
            </h1>
            <p className="text-sm text-muted-foreground">Transform vague ideas into powerful prompts</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
