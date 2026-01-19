import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PromptTemplate } from "@/lib/templates";
import { getTemplatesByCategory, searchTemplates } from "@/lib/templates";
import { BookOpen, Search, Plus, Sparkles } from "lucide-react";

interface TemplateLibraryProps {
  onSelectTemplate: (template: PromptTemplate) => void;
}

export function TemplateLibrary({ onSelectTemplate }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const templatesByCategory = getTemplatesByCategory();
  const categories = Object.keys(templatesByCategory);

  const filteredTemplates = searchQuery ? searchTemplates(searchQuery) : null;

  return (
    <Card className="glass rounded-2xl overflow-hidden">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="pl-9 rounded-xl bg-muted/30 border-border/50 focus:bg-muted/50 transition-colors"
          />
        </div>

        {filteredTemplates ? (
          <ScrollArea className="h-[220px]">
            <div className="space-y-2 pr-2">
              {filteredTemplates.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No templates found
                </p>
              ) : (
                filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onSelect={onSelectTemplate}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        ) : (
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="w-full grid grid-cols-4 gap-1 h-auto p-1 bg-muted/30 rounded-xl">
              {categories.slice(0, 4).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="text-xs py-1.5 px-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  {category.slice(0, 6)}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-3">
                <ScrollArea className="h-[180px]">
                  <div className="space-y-2 pr-2">
                    {templatesByCategory[category].map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onSelect={onSelectTemplate}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}

function TemplateCard({
  template,
  onSelect,
}: {
  template: PromptTemplate;
  onSelect: (template: PromptTemplate) => void;
}) {
  return (
    <div
      className="p-3 rounded-xl bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
      onClick={() => onSelect(template)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
            {template.name}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {template.description}
          </p>
          <div className="flex gap-1 mt-2">
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 rounded-md bg-primary/10 text-primary border-0"
            >
              {template.tone}
            </Badge>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 rounded-md"
            >
              {template.format}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 hover:bg-primary/20"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template);
          }}
        >
          <Plus className="h-4 w-4 text-primary" />
        </Button>
      </div>
    </div>
  );
}
