import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PromptScore as Score } from "@/lib/promptEnhancer";
import { Target, Search, CheckCircle, Award } from "lucide-react";

interface PromptScoreProps {
  score: Score;
}

const scoreConfig = [
  {
    key: "clarity",
    label: "Clarity",
    icon: Target,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    key: "specificity",
    label: "Specificity",
    icon: Search,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    key: "completeness",
    label: "Completeness",
    icon: CheckCircle,
    gradient: "from-green-500 to-emerald-500",
  },
];

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Work";
}

function getScoreGradient(score: number): string {
  if (score >= 80) return "from-green-500 to-emerald-500";
  if (score >= 60) return "from-yellow-500 to-amber-500";
  if (score >= 40) return "from-orange-500 to-red-400";
  return "from-red-500 to-rose-500";
}

export function PromptScoreCard({ score }: PromptScoreProps) {
  return (
    <Card className="glass rounded-2xl overflow-hidden animate-scale-in">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Award className="h-4 w-4 text-primary" />
          </div>
          Quality Score
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Main Score Circle */}
        <div className="flex items-center justify-center">
          <div className="relative w-28 h-28 group">
            {/* Background glow */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${getScoreGradient(score.overall)} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}
            />

            {/* Circle SVG */}
            <svg className="w-28 h-28 transform -rotate-90 relative">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted/30"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(score.overall / 100) * 301.6} 301.6`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(280, 80%, 65%)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`text-3xl font-bold ${getScoreColor(score.overall)}`}
              >
                {score.overall}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {getScoreLabel(score.overall)}
              </span>
            </div>
          </div>
        </div>

        {/* Individual Scores */}
        <div className="space-y-4">
          {scoreConfig.map(({ key, label, icon: Icon, gradient }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <div
                    className={`p-1 rounded bg-gradient-to-br ${gradient} bg-opacity-10`}
                  >
                    <Icon className="h-3 w-3 text-foreground" />
                  </div>
                  {label}
                </span>
                <span className="font-semibold tabular-nums">
                  {score[key as keyof Score]}%
                </span>
              </div>
              <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradient} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${score[key as keyof Score]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
