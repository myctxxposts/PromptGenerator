
export enum PromptStyle {
  CREATIVE = "Creative",
  FORMAL = "Formal",
  HUMOROUS = "Humorous",
  TECHNICAL = "Technical",
  PERSUASIVE = "Persuasive",
  INFORMATIVE = "Informative",
  CASUAL = "Casual",
  ACADEMIC = "Academic",
}

export enum PromptAction {
  WRITE_STORY = "Write a story about",
  EXPLAIN = "Explain in detail",
  COMPARE_CONTRAST = "Compare and contrast",
  GENERATE_IDEAS = "Generate innovative ideas for",
  SUMMARIZE = "Summarize the key points of",
  CREATE_SCRIPT = "Create a script for a video about",
  ANALYZE = "Analyze the impact of",
  BRAINSTORM = "Brainstorm solutions for",
}

export enum PromptLength {
  BRIEF = "brief (1-2 sentences)",
  SHORT = "short (a paragraph)",
  MEDIUM = "medium (2-3 paragraphs)",
  LONG = "long (multiple paragraphs / detailed)",
  EXTENSIVE = "extensive (a short essay)",
}

export interface PromptOptions {
  topic: string;
  style: PromptStyle;
  action: PromptAction;
  length: PromptLength;
  keywords: string; // comma-separated
  customInstructions?: string;
  targetAudience?: string;
}