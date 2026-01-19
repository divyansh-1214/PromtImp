// Prompt Template Library

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  useCase:
    | "coding"
    | "academic"
    | "content"
    | "resume"
    | "uiux"
    | "startup"
    | "ai-prompting";
  tone: "formal" | "casual" | "academic" | "professional" | "creative";
  format: "bullets" | "steps" | "long" | "short" | "code";
}

export const promptTemplates: PromptTemplate[] = [
  // Coding Templates
  {
    id: "code-review",
    name: "Code Review Request",
    description: "Get a thorough code review with suggestions",
    category: "Coding",
    prompt: "Review this code for bugs, performance issues, and best practices",
    useCase: "coding",
    tone: "professional",
    format: "bullets",
  },
  {
    id: "debug-help",
    name: "Debug Assistance",
    description: "Get help debugging an issue",
    category: "Coding",
    prompt: "Help me debug this error and explain why it occurs",
    useCase: "coding",
    tone: "professional",
    format: "steps",
  },
  {
    id: "api-design",
    name: "API Design",
    description: "Design a RESTful API structure",
    category: "Coding",
    prompt: "Design a RESTful API for a user management system",
    useCase: "coding",
    tone: "professional",
    format: "code",
  },

  // Academic Templates
  {
    id: "research-question",
    name: "Research Question",
    description: "Frame a research question properly",
    category: "Academic",
    prompt:
      "Help me formulate a research question about the impact of social media on mental health",
    useCase: "academic",
    tone: "academic",
    format: "long",
  },
  {
    id: "literature-review",
    name: "Literature Review",
    description: "Structure a literature review",
    category: "Academic",
    prompt:
      "Outline a literature review structure for my thesis on renewable energy",
    useCase: "academic",
    tone: "academic",
    format: "bullets",
  },
  {
    id: "thesis-statement",
    name: "Thesis Statement",
    description: "Develop a strong thesis statement",
    category: "Academic",
    prompt:
      "Help me develop a thesis statement for my essay on climate change policy",
    useCase: "academic",
    tone: "academic",
    format: "short",
  },

  // Content Writing Templates
  {
    id: "blog-outline",
    name: "Blog Post Outline",
    description: "Create a structured blog post outline",
    category: "Content",
    prompt: "Create an outline for a blog post about productivity tips",
    useCase: "content",
    tone: "casual",
    format: "bullets",
  },
  {
    id: "social-media",
    name: "Social Media Post",
    description: "Craft engaging social media content",
    category: "Content",
    prompt: "Write engaging social media posts for a product launch",
    useCase: "content",
    tone: "creative",
    format: "short",
  },
  {
    id: "email-newsletter",
    name: "Email Newsletter",
    description: "Write a compelling newsletter",
    category: "Content",
    prompt: "Write a monthly newsletter update for our subscribers",
    useCase: "content",
    tone: "professional",
    format: "long",
  },

  // Resume Templates
  {
    id: "resume-summary",
    name: "Professional Summary",
    description: "Write a powerful resume summary",
    category: "Resume",
    prompt:
      "Write a professional summary for a software engineer with 5 years experience",
    useCase: "resume",
    tone: "professional",
    format: "short",
  },
  {
    id: "achievement-bullets",
    name: "Achievement Bullets",
    description: "Transform responsibilities into achievements",
    category: "Resume",
    prompt:
      "Convert these job responsibilities into achievement-focused bullet points",
    useCase: "resume",
    tone: "professional",
    format: "bullets",
  },
  {
    id: "cover-letter",
    name: "Cover Letter",
    description: "Write a personalized cover letter",
    category: "Resume",
    prompt: "Write a cover letter for a marketing manager position",
    useCase: "resume",
    tone: "professional",
    format: "long",
  },

  // UI/UX Templates
  {
    id: "user-persona",
    name: "User Persona",
    description: "Create detailed user personas",
    category: "UI/UX",
    prompt: "Create a user persona for an e-commerce mobile app",
    useCase: "uiux",
    tone: "professional",
    format: "long",
  },
  {
    id: "ux-audit",
    name: "UX Audit Checklist",
    description: "Audit a design for UX issues",
    category: "UI/UX",
    prompt: "Create a UX audit checklist for evaluating a website",
    useCase: "uiux",
    tone: "professional",
    format: "bullets",
  },
  {
    id: "design-critique",
    name: "Design Critique",
    description: "Get constructive design feedback",
    category: "UI/UX",
    prompt: "Provide a design critique for this landing page design",
    useCase: "uiux",
    tone: "professional",
    format: "bullets",
  },

  // Startup Templates
  {
    id: "pitch-deck",
    name: "Pitch Deck Outline",
    description: "Structure an investor pitch deck",
    category: "Startup",
    prompt: "Create an outline for a startup pitch deck for a fintech app",
    useCase: "startup",
    tone: "professional",
    format: "bullets",
  },
  {
    id: "business-model",
    name: "Business Model Canvas",
    description: "Fill out a business model canvas",
    category: "Startup",
    prompt: "Help me complete a business model canvas for a SaaS product",
    useCase: "startup",
    tone: "professional",
    format: "long",
  },
  {
    id: "mvp-features",
    name: "MVP Feature List",
    description: "Define MVP features for a product",
    category: "Startup",
    prompt: "Define the MVP features for a project management tool",
    useCase: "startup",
    tone: "professional",
    format: "bullets",
  },

  // AI Prompting Templates
  {
    id: "chain-of-thought",
    name: "Chain of Thought",
    description: "Create a step-by-step reasoning prompt",
    category: "AI Prompting",
    prompt: "Solve this problem step by step, showing your reasoning",
    useCase: "ai-prompting",
    tone: "professional",
    format: "steps",
  },
  {
    id: "few-shot",
    name: "Few-Shot Example",
    description: "Create a few-shot learning prompt",
    category: "AI Prompting",
    prompt: "Given these examples, complete the following task",
    useCase: "ai-prompting",
    tone: "professional",
    format: "long",
  },
  {
    id: "role-play",
    name: "Role-Playing Prompt",
    description: "Create a role-based prompt",
    category: "AI Prompting",
    prompt: "Act as an expert in this field and provide advice",
    useCase: "ai-prompting",
    tone: "professional",
    format: "long",
  },
];

export function getTemplatesByCategory(): Record<string, PromptTemplate[]> {
  return promptTemplates.reduce(
    (acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = [];
      }
      acc[template.category].push(template);
      return acc;
    },
    {} as Record<string, PromptTemplate[]>,
  );
}

export function searchTemplates(query: string): PromptTemplate[] {
  const lowerQuery = query.toLowerCase();
  return promptTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(lowerQuery) ||
      template.description.toLowerCase().includes(lowerQuery) ||
      template.category.toLowerCase().includes(lowerQuery) ||
      template.prompt.toLowerCase().includes(lowerQuery),
  );
}
