// Prompt Enhancement Engine - Client-side algorithms
import axios from "axios";
export type UseCase =
  | "coding"
  | "academic"
  | "content"
  | "resume"
  | "uiux"
  | "startup"
  | "ai-prompting";
export type Tone =
  | "professional"
  | "casual"
  | "formal"
  | "creative"
  | "academic";
export type OutputFormat = "bullets" | "steps" | "long" | "short" | "code";

export interface PromptScore {
  clarity: number;
  specificity: number;
  completeness: number;
  overall: number;
}

export interface EnhancementResult {
  improved: string;
  score: PromptScore;
  suggestions: string[];
  changes: string[];
}

const useCaseEnhancements: Record<
  UseCase,
  (prompt: string) => { prefix: string; suffix: string; additions: string[] }
> = {
  coding: (prompt) => ({
    prefix: "As an experienced software developer, ",
    suffix:
      "\n\nPlease include:\n- Code examples with comments\n- Error handling considerations\n- Best practices and patterns\n- Performance considerations",
    additions: [
      "Specify the programming language/framework",
      "Include expected input/output examples",
      "Mention any constraints or requirements",
    ],
  }),
  academic: (prompt) => ({
    prefix: "From an academic research perspective, ",
    suffix:
      "\n\nPlease provide:\n- Evidence-based analysis\n- Relevant citations and sources\n- Multiple perspectives\n- Critical evaluation",
    additions: [
      "Define the scope and boundaries",
      "Specify the academic discipline",
      "Include methodology requirements",
    ],
  }),
  content: (prompt) => ({
    prefix: "As a professional content creator, ",
    suffix:
      "\n\nConsider:\n- Target audience engagement\n- SEO optimization\n- Clear structure and flow\n- Call-to-action elements",
    additions: [
      "Define the target audience",
      "Specify content length and format",
      "Include key messages to convey",
    ],
  }),
  resume: (prompt) => ({
    prefix: "As a career development expert, ",
    suffix:
      "\n\nFocus on:\n- Quantifiable achievements\n- Action verbs and impact statements\n- Industry-specific keywords\n- ATS optimization",
    additions: [
      "Specify the target role/industry",
      "Include years of experience",
      "Highlight key skills to emphasize",
    ],
  }),
  uiux: (prompt) => ({
    prefix: "As a UI/UX design specialist, ",
    suffix:
      "\n\nAddress:\n- User experience principles\n- Accessibility considerations\n- Visual hierarchy\n- Interaction patterns",
    additions: [
      "Define the target user personas",
      "Specify platform requirements",
      "Include design constraints",
    ],
  }),
  startup: (prompt) => ({
    prefix: "As a startup strategist and entrepreneur, ",
    suffix:
      "\n\nInclude:\n- Market analysis considerations\n- Competitive advantages\n- Scalability potential\n- Revenue model ideas",
    additions: [
      "Define the problem being solved",
      "Specify target market segment",
      "Include budget/resource constraints",
    ],
  }),
  "ai-prompting": (prompt) => ({
    prefix: "As an AI prompt engineering expert, ",
    suffix:
      "\n\nOptimize for:\n- Clear instructions and constraints\n- Expected output format\n- Edge cases handling\n- Iterative refinement potential",
    additions: [
      "Specify the AI model/platform",
      "Define success criteria",
      "Include example outputs if possible",
    ],
  }),
};

const toneModifiers: Record<Tone, string> = {
  formal: "using formal and professional language",
  casual: "in a friendly and conversational tone",
  academic: "with scholarly rigor and precision",
  professional: "maintaining a business-appropriate tone",
  creative: "with creative flair and engaging style",
};

const formatInstructions: Record<OutputFormat, string> = {
  bullets: "\n\nFormat the response as organized bullet points.",
  steps: "\n\nProvide a step-by-step guide with numbered instructions.",
  long: "\n\nProvide a comprehensive, detailed response.",
  short: "\n\nKeep the response concise and to the point.",
  code: "\n\nFocus on code implementation with minimal prose.",
};

function calculateScore(original: string, improved: string): PromptScore {
  const originalWords = original.split(/\s+/).length;
  const improvedWords = improved.split(/\s+/).length;

  // Clarity: Check for clear structure, questions, and specificity markers
  const hasQuestionMark = improved.includes("?") ? 10 : 0;
  const hasStructure =
    improved.includes(":") || improved.includes("-") || improved.includes("•")
      ? 15
      : 0;
  const hasContext = improved.length > original.length * 1.5 ? 20 : 10;
  const clarity = Math.min(
    100,
    55 + hasQuestionMark + hasStructure + hasContext,
  );

  // Specificity: Check for specific terms, numbers, examples
  const hasNumbers = /\d+/.test(improved) ? 15 : 0;
  const hasExamples = /example|such as|like|e\.g\./i.test(improved) ? 15 : 0;
  const hasConstraints = /must|should|require|need|include|avoid/i.test(
    improved,
  )
    ? 15
    : 0;
  const specificity = Math.min(
    100,
    55 + hasNumbers + hasExamples + hasConstraints,
  );

  // Completeness: Word count ratio and key elements
  const lengthBonus = Math.min(
    25,
    Math.floor((improvedWords / originalWords) * 10),
  );
  const hasRoleContext = /as a|from|perspective|expert/i.test(improved)
    ? 15
    : 0;
  const hasOutputFormat = /format|provide|include|list|explain/i.test(improved)
    ? 10
    : 0;
  const completeness = Math.min(
    100,
    50 + lengthBonus + hasRoleContext + hasOutputFormat,
  );

  const overall = Math.round((clarity + specificity + completeness) / 3);

  return { clarity, specificity, completeness, overall };
}

function generateSuggestions(original: string, useCase: UseCase): string[] {
  const suggestions: string[] = [];

  if (original.length < 50) {
    suggestions.push("Add more context to your prompt for better results");
  }

  if (!/\?/.test(original)) {
    suggestions.push("Consider framing your request as a question for clarity");
  }

  if (!/example|such as|like/i.test(original)) {
    suggestions.push("Include examples of what you're looking for");
  }

  if (!/must|should|avoid|don't/i.test(original)) {
    suggestions.push("Add constraints to narrow down the response");
  }

  const useCaseAdditions = useCaseEnhancements[useCase](original).additions;
  suggestions.push(...useCaseAdditions);

  return suggestions.slice(0, 5);
}

function identifyChanges(original: string, improved: string): string[] {
  const changes: string[] = [];

  if (improved.includes("As a") || improved.includes("From a")) {
    changes.push("Added role/perspective context");
  }

  if (improved.length > original.length * 1.3) {
    changes.push("Expanded with additional details");
  }

  if (/Please (include|provide|consider|address):/i.test(improved)) {
    changes.push("Added structured requirements");
  }

  if (/Format|bullet|step|concise|detailed/i.test(improved)) {
    changes.push("Specified output format");
  }

  if (/formal|casual|academic|professional|creative/i.test(improved)) {
    changes.push("Applied tone modifier");
  }

  return changes;
}

export function enhancePrompt(
  original: string,
  useCase: UseCase,
  tone: Tone,
  format: OutputFormat,
): EnhancementResult {
  axios
    .post(`http://localhost:5000/enhance`, {
      original: original,
      useCase: useCase,
      tone: tone,
      format: format,
      nodel: "",
    })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  // i will send the orgnal, usecases and the tone to backend then i will get the respnese by calling the api
  if (!original.trim()) {
    return {
      improved: "",
      score: { clarity: 0, specificity: 0, completeness: 0, overall: 0 },
      suggestions: ["Enter a prompt to get started"],
      changes: [],
    };
  }

  const enhancement = useCaseEnhancements[useCase](original);
  const toneModifier = toneModifiers[tone];
  const formatInstruction = formatInstructions[format];

  // Build the improved prompt
  let improved = enhancement.prefix;
  improved += original.trim();

  if (
    !original.endsWith(".") &&
    !original.endsWith("?") &&
    !original.endsWith("!")
  ) {
    improved += ".";
  }

  improved += ` Please respond ${toneModifier}.`;
  improved += enhancement.suffix;
  improved += formatInstruction;

  const score = calculateScore(original, improved);
  const suggestions = generateSuggestions(original, useCase);
  const changes = identifyChanges(original, improved);

  return { improved, score, suggestions, changes };
}

export interface PromptHistoryItem {
  id: string;
  original: string;
  improved: string;
  useCase: UseCase;
  tone: Tone;
  format: OutputFormat;
  score: PromptScore;
  timestamp: number;
}

export function saveToHistory(item: PromptHistoryItem): void {
  const history = getHistory();
  history.unshift(item);
  // Keep only last 50 items
  const trimmed = history.slice(0, 50);
  localStorage.setItem("prompt-history", JSON.stringify(trimmed));
}

export function getHistory(): PromptHistoryItem[] {
  try {
    const stored = localStorage.getItem("prompt-history");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem("prompt-history");
}

export function deleteFromHistory(id: string): void {
  const history = getHistory().filter((item) => item.id !== id);
  localStorage.setItem("prompt-history", JSON.stringify(history));
}
