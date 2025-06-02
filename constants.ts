

import { PromptStyle, PromptAction, PromptLength, PromptOptions, PromptExamples } from './types'; // Removed PromptOutputFormat

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
  { value: PromptAction.COMPOSE_EMAIL, label: "Compose an email about..." },
];

export const PROMPT_LENGTHS: { value: PromptLength; label: string }[] = [
  { value: PromptLength.BRIEF, label: "Brief (1-2 sentences)" },
  { value: PromptLength.SHORT, label: "Short (a paragraph)" },
  { value: PromptLength.MEDIUM, label: "Medium (2-3 paragraphs)" },
  { value: PromptLength.LONG, label: "Long (multiple paragraphs / detailed)" },
  { value: PromptLength.EXTENSIVE, label: "Extensive (a short essay)" },
];

export const PROMPT_EXAMPLES: { value: PromptExamples; label: string }[] = [
  { value: PromptExamples.NO, label: "No" },
  { value: PromptExamples.YES, label: "Yes, include examples" },
];

// Removed PROMPT_OUTPUT_FORMATS constant

export const ACTION_SPECIFIC_INSTRUCTIONS_TEMPLATES: Partial<Record<PromptAction, string>> = {
  [PromptAction.SUMMARIZE]: `The summary should be formatted in a clear and structured manner, ideally consisting of a brief introduction to the main topic, followed by key points and conclusions drawn from the input.

Details to keep in mind while summarizing:
Focus on the main ideas and arguments presented.
Avoid personal opinions or interpretations not present in the source.
Ensure that the summary is concise and to the point.

Constraints to be aware of:
Do not include any direct quotes unless specifically asked.
Maintain an objective tone throughout the summary.
Ensure the summary is free of grammatical errors and typos.`,

  [PromptAction.EXPLAIN]: `Provide a comprehensive and clear explanation of the topic. Break down complex concepts into easily understandable parts.

Key aspects for explanation:
Define the core concept(s) clearly.
Elaborate on important features, mechanisms, or components.
Discuss any relevant implications, applications, or significance.

Structure and Clarity:
Organize the explanation logically.
Use precise language and avoid jargon where possible, or explain it if necessary.
Ensure the explanation is thorough yet accessible to the target audience.`,

  [PromptAction.WRITE_STORY]: `Key Story Elements to Include:
Characters: Develop compelling characters with clear motivations and backstories.
Setting: Describe the time and place vividly to create a strong atmosphere.
Plot: Craft a clear sequence of events with an engaging beginning, rising action, climax, falling action, and satisfying resolution.
Conflict: Introduce a central conflict or problem (internal or external) that drives the story.
Theme: Consider an underlying message, idea, or question the story explores.

Narrative Style & Pacing:
Point of View: Specify (e.g., first person, third person limited, third person omniscient).
Tone: Define the overall feeling (e.g., humorous, suspenseful, dramatic, whimsical).
Pacing: Control the speed of the story to build interest, create suspense, or allow for reflection.

Dialogue:
Use realistic and engaging dialogue that reveals character, advances the plot, and sounds natural for the characters.

Sensory Details & Imagery:
Incorporate details that appeal to the five senses (sight, sound, smell, taste, touch) to immerse the reader.
Use vivid imagery and figurative language (metaphors, similes) where appropriate.`,

  [PromptAction.COMPARE_CONTRAST]: `Subjects for Comparison:
Clearly identify the two or more subjects, items, or concepts to be compared and contrasted.

Key Criteria for Comparison:
Establish specific, relevant points or criteria on which the comparison and contrast will be based (e.g., features, performance, cost, historical context, effectiveness, user experience).

Structure:
Organize the comparison logically. Options include:
  Point-by-Point: Discuss each criterion for all subjects together before moving to the next criterion.
  Subject-by-Subject: Discuss all criteria for one subject, then all criteria for the next subject.

Balanced View:
Present both similarities and differences fairly and thoroughly for each criterion.
Avoid bias unless the purpose is to argue for one subject's superiority based on evidence.

Evidence and Examples:
Support points of comparison with specific examples, data, or evidence where appropriate and available.

Conclusion:
Summarize the main similarities and differences.
Offer an overall insight, judgment, or conclusion based on the comparison.`,

  [PromptAction.GENERATE_IDEAS]: `Focus Area/Problem:
Clearly define the specific topic, challenge, or domain for which ideas are needed.

Type of Ideas Sought:
Specify the nature of ideas (e.g., innovative solutions, creative concepts, marketing strategies, content topics, product features, research questions).

Quantity vs. Quality (or both):
Indicate if the goal is a large number of diverse ideas (divergent thinking) or a few highly developed, practical, and original ones (convergent thinking), or a mix.

Constraints or Boundaries:
List any limitations or specific requirements the ideas should adhere to (e.g., budget, timeline, target audience, technological feasibility, ethical considerations, specific platforms).

Format for Ideas:
Suggest how the ideas should be presented (e.g., bullet points, brief descriptions with rationale, visual concepts, user stories).

Stimuli/Inspiration (Optional):
Provide any keywords, existing examples, trends, user needs, or "How Might We..." questions to spark creativity.`,

  [PromptAction.CREATE_SCRIPT]: `Purpose of the Script:
Define the primary goal (e.g., to educate, entertain, persuade, inform, sell, demonstrate).

Target Audience:
Specify who the script is for, as this influences tone, language, and content.

Format of the Script:
Indicate the type (e.g., monologue, dialogue between characters, interview, narration over visuals, explainer video, advertisement, podcast segment).

Key Message(s):
What are the one to three main takeaways or points the audience should understand or remember?

Structure & Flow:
Hook: How to grab the audience's attention within the first few seconds.
Introduction: Briefly introduce the topic, problem, or purpose.
Main Content/Body: Develop the key messages in a logical sequence. Break into scenes or sections if applicable.
Call to Action (if any): Clearly state what you want the audience to do next.
Outro/Conclusion: Summarize key points or provide a memorable closing thought.

Visuals/Audio Cues (if applicable):
For video/audio scripts, describe key visual elements, on-screen text, sound effects, or music cues.
(e.g., [SCENE START: Office - Day], [SOUND: Upbeat music fades], [TEXT OVERLAY: Key Fact]).

Tone and Style:
Define the desired mood (e.g., formal, casual, energetic, empathetic, humorous, authoritative, inspirational).

Characters (if any):
Provide brief descriptions of characters, their roles, and personalities.
Scene Descriptions (if applicable): Briefly outline the setting for each scene.`,

  [PromptAction.ANALYZE]: `Subject of Analysis:
Clearly define what is being analyzed (e.g., a text, data set, historical event, social phenomenon, artwork, business problem, scientific finding).

Scope and Depth of Analysis:
Specify what aspects to focus on (e.g., identify causes and effects, strengths and weaknesses, underlying patterns/themes, compare different perspectives, evaluate effectiveness, predict future trends).
Indicate the required level of detail.

Methodology/Framework (if specific):
Suggest any particular analytical approach, model, or theoretical lens to use (e.g., SWOT analysis, thematic analysis, statistical analysis, literary criticism).

Evidence and Support:
Emphasize the need to support all claims, interpretations, and conclusions with specific evidence from the provided input or relevant, credible sources.

Structure of Analysis:
Introduction: State the subject, the purpose of the analysis, and potentially the main argument or thesis.
Body Paragraphs/Sections: Present different facets of the analysis, each supported by evidence and reasoning.
Conclusion: Summarize the key findings and offer broader insights, implications, or recommendations.

Objectivity vs. Persuasion:
Clarify if the analysis should be purely objective or if it should argue for a particular interpretation or viewpoint.
Acknowledge counterarguments or alternative interpretations if relevant.`,

  [PromptAction.BRAINSTORM]: `Problem Definition:
Clearly and concisely state the problem, challenge, or question that needs solutions.

Goals of Brainstorming:
What are the desired outcomes? (e.g., a wide range of innovative ideas, practical and actionable solutions, cost-effective approaches, quick wins, long-term strategies).

Types of Solutions/Ideas:
Encourage exploration of various categories: (e.g., technological, process-oriented, marketing-focused, human-centered, unconventional, simple, complex).

Key Constraints/Considerations:
List any non-negotiable limitations or important factors to keep in mind (e.g., budget, available resources, timeline, feasibility, ethical concerns, target users, scalability).

Format for Ideas:
How should the brainstormed solutions be presented? (e.g., simple list, brief descriptions with pros/cons, categorized ideas, mind map format).

Encourage Diverse & Creative Thinking:
Prompt for quantity over quality initially (if appropriate).
Encourage "out-of-the-box" thinking, building on others' ideas, and challenging assumptions.
Consider different perspectives (e.g., user, expert, novice).`,

  [PromptAction.COMPOSE_EMAIL]: `Purpose of the Email:
Clearly state the primary reason for writing (e.g., to inform, request information, make a proposal, follow up, introduce, apologize, congratulate, invite).

Recipient(s) & Context:
Who is the email for? (e.g., a client, colleague, manager, potential customer, team).
Is there any prior communication or existing relationship to consider? This influences tone and formality.

Key Information/Message Points:
List the essential pieces of information or messages that MUST be included in the email. Be specific.

Desired Structure of the Email:
Subject Line: Suggest a clear, concise, and informative subject that reflects the email's content.
Salutation: Appropriate greeting (e.g., Dear [Name], Hi [Name], To Whom It May Concern).
Opening: State the purpose directly or provide brief context.
Body: Elaborate on the key information in a logical and organized manner. Use paragraphs for readability. Consider bullet points for lists.
Call to Action (if any): Clearly state what you want the recipient to do (e.g., reply by [date], schedule a meeting, provide feedback, visit a link).
Closing: Professional and courteous closing (e.g., Sincerely, Best regards, Thanks).
Signature: Include necessary sender information (name, title, company if relevant).

Tone and Style:
Specify the desired tone (e.g., formal, informal, friendly, assertive, empathetic, urgent, appreciative). Ensure it's appropriate for the recipient and purpose.

Attachments (if any):
Mention if any documents should be referred to as attachments.

Proofreading Note:
Remind to emphasize clarity, conciseness, and freedom from errors.`,
};

export const DEFAULT_PROMPT_OPTIONS: PromptOptions = {
  topic: "",
  style: PromptStyle.CREATIVE,
  action: PromptAction.EXPLAIN, // Default action
  length: PromptLength.MEDIUM,
  addExamples: PromptExamples.NO,
  keywords: "",
  persona: "",
  customInstructions: ACTION_SPECIFIC_INSTRUCTIONS_TEMPLATES[PromptAction.EXPLAIN] || "", // Initialize with default action's template
  targetAudience: "",
  context: "", 
  outputFormat: "", // Changed to empty string for free-text, optional field
};
