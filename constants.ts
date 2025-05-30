
import { PromptStyle, PromptAction, PromptLength, PromptOptions } from './types';

export const PROMPT_STYLES: { value: PromptStyle; label: string }[] = [
  { value: PromptStyle.CREATIVE, label: "Creative & Imaginative" },
  { value: PromptStyle.FORMAL, label: "Formal & Professional" },
  { value: PromptStyle.HUMOROUS, label: "Humorous & Witty" },
  { value: PromptStyle.TECHNICAL, label: "Technical & Precise" },
  { value: PromptStyle.PERSUASIVE, label: "Persuasive & Convincing" },
  { value: PromptStyle.INFORMATIVE, label: "Informative & Factual" },
  { value: PromptStyle.CASUAL, label: "Casual & Conversational" },
  { value: PromptStyle.ACADEMIC, label: "Academic & Scholarly" },
];

export const PROMPT_ACTIONS: { value: PromptAction; label: string }[] = [
  { value: PromptAction.WRITE_STORY, label: "Write a story about..." },
  { value: PromptAction.EXPLAIN, label: "Explain in detail..." },
  { value: PromptAction.COMPARE_CONTRAST, label: "Compare and contrast..." },
  { value: PromptAction.GENERATE_IDEAS, label: "Generate innovative ideas for..." },
  { value: PromptAction.SUMMARIZE, label: "Summarize the key points of..." },
  { value: PromptAction.CREATE_SCRIPT, label: "Create a script for a video about..." },
  { value: PromptAction.ANALYZE, label: "Analyze the impact of..." },
  { value: PromptAction.BRAINSTORM, label: "Brainstorm solutions for..." },
];

export const PROMPT_LENGTHS: { value: PromptLength; label: string }[] = [
  { value: PromptLength.BRIEF, label: "Brief (1-2 sentences)" },
  { value: PromptLength.SHORT, label: "Short (a paragraph)" },
  { value: PromptLength.MEDIUM, label: "Medium (2-3 paragraphs)" },
  { value: PromptLength.LONG, label: "Long (multiple paragraphs / detailed)" },
  { value: PromptLength.EXTENSIVE, label: "Extensive (a short essay)" },
];

export const DEFAULT_PROMPT_OPTIONS: PromptOptions = {
  topic: "",
  style: PromptStyle.CREATIVE,
  action: PromptAction.GENERATE_IDEAS,
  length: PromptLength.MEDIUM,
  keywords: "",
  customInstructions: "",
  targetAudience: "",
};