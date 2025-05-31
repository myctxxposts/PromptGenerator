

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
  COMPOSE_EMAIL = "Compose an email about",
}

export enum PromptLength {
  BRIEF = "brief (1-2 sentences)",
  SHORT = "short (a paragraph)",
  MEDIUM = "medium (2-3 paragraphs)",
  LONG = "long (multiple paragraphs / detailed)",
  EXTENSIVE = "extensive (a short essay)",
}

export enum PromptExamples {
  YES = "Yes",
  NO = "No",
}

// Removed PromptOutputFormat enum

export interface PromptOptions {
  topic: string; // Will now serve as the main "Input"
  style: PromptStyle;
  action: PromptAction; // Will be part of "Instructions"
  length: PromptLength;
  addExamples: PromptExamples;
  keywords: string; // Will be part of "Context"
  persona?: string; // Will be "AI Role"
  customInstructions?: string; // Will be main part of "Instructions"
  targetAudience?: string; // Will be part of "Context"
  context?: string; // New field for "Context"
  outputFormat?: string; // Changed to string for free-text input, optional
}
