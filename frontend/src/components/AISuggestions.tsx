import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ChevronRight } from "lucide-react";

interface AISuggestionsProps {
  suggestions: string[];
}

export function AISuggestions({ suggestions }: AISuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card
      className="glass rounded-2xl overflow-hidden animate-scale-in"
      style={{ animationDelay: "0.1s" }}
    >
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-yellow-500/10">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
          </div>
          Pro Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm p-2.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="p-1 rounded-lg bg-primary/10 mt-0.5 group-hover:bg-primary/20 transition-colors">
                <ChevronRight className="h-3 w-3 text-primary" />
              </div>
              <span className="text-muted-foreground leading-relaxed">
                {suggestion}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
