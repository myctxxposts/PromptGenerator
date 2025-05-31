

import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PromptGeneratorForm from './components/PromptGeneratorForm';
import GeneratedPromptDisplay from './components/GeneratedPromptDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { PromptOptions, PromptExamples } from './types';

const App: React.FC = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generatePromptText = (options: PromptOptions): string => {
    let prompt = "";

    // 1. AI Role
    if (options.persona?.trim()) {
      prompt += `AI Role:\nAs an AI, your role is to act as ${options.persona.trim()}.\n\n`;
    }

    // 2. Input
    if (options.topic?.trim()) {
        prompt += `Input:\n${options.topic.trim()}\n\n`;
    } else {
        prompt += `Input:\n[The main topic/question/data for the AI to process needs to be provided here.]\n\n`;
    }

    // 3. Instructions
    const instructionLines: string[] = [];
    instructionLines.push(`- Your primary task is to ${options.action.toLowerCase()} the provided input.`);

    let hasGeneralInstructions = false;
    // Add Style, Length, and Examples instructions first
    if (options.style) {
        instructionLines.push(`- Adopt a ${options.style.toLowerCase()} style for the response.`);
        hasGeneralInstructions = true;
    }
    if (options.length) {
        instructionLines.push(`- The desired output length is ${options.length}.`);
        hasGeneralInstructions = true;
    }
    if (options.addExamples === PromptExamples.YES) {
        instructionLines.push(`- Include examples`); // Changed this line
        hasGeneralInstructions = true;
    }

    // Then add Custom Instructions
    if (options.customInstructions?.trim()) {
        const rawCustomLines = options.customInstructions.trim().split('\n');
        const formattedCustomLines: string[] = [];

        rawCustomLines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.length === 0) {
                // Preserve empty lines from template for spacing, indented
                formattedCustomLines.push("  ");
            } else if (trimmedLine.endsWith(':')) {
                // Treat as a sub-heading: indent, no hyphen
                formattedCustomLines.push(`  ${trimmedLine}`);
            } else {
                // Treat as a list item: indent and hyphenate
                formattedCustomLines.push(`  - ${trimmedLine}`);
            }
        });

        if (formattedCustomLines.length > 0) {
            const customInstructionFormatted = formattedCustomLines.join('\n');
            // Add an empty line before "Additional specific instructions:" if there were other general instructions.
            if (hasGeneralInstructions && instructionLines.length > 3) { // Check if general instructions were added (more than just the primary task)
                instructionLines.push(""); // Add an empty line for separation
            }
            instructionLines.push(`Additional specific instructions:\n${customInstructionFormatted}`);
        }
    }


    if (instructionLines.length > 0) {
        prompt += `Instructions:\n${instructionLines.join("\n")}\n\n`;
    }

    // 4. Context
    const contextBlockLines: string[] = [];
    if (options.context?.trim()) {
        const mainContextContent = options.context.trim().split('\n')
            .map(line => `  ${line.trim()}`) // Indent each line of main context
            .join('\n');
        contextBlockLines.push(`- Main background/reference material provided:\n${mainContextContent}`);
    }
    if (options.keywords?.trim()) {
        contextBlockLines.push(`- Key themes/keywords to consider: ${options.keywords.trim()}`);
    }
    if (options.targetAudience?.trim()) {
        contextBlockLines.push(`- The intended audience is: ${options.targetAudience.trim()}`);
    }

    if (contextBlockLines.length > 0) {
        prompt += `Context:\n${contextBlockLines.join("\n")}\n\n`;
    }

    // 5. Expected Output Format
    if (options.outputFormat?.trim()) {
        prompt += `Expected Output Format:\n- ${options.outputFormat.trim()}\n`;
    }

    return prompt.trim();
  };

  const handleGeneratePrompt = useCallback(async (options: PromptOptions) => {
    setIsGenerating(true);
    setGeneratedPrompt(null);

    // Simulate API call or processing time
    await new Promise(resolve => setTimeout(resolve, 1200));

    const promptText = generatePromptText(options);
    setGeneratedPrompt(promptText);
    setIsGenerating(false);

    // Scroll to the generated prompt display
    setTimeout(() => {
        const displayElement = document.getElementById('generated-prompt-display');
        if (displayElement) {
            displayElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);

  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 mb-3">
              Unleash Your Creativity
            </h2>
            <p className="text-md sm:text-lg text-gray-300 max-w-xl mx-auto">
             Define the AI's role, provide context, specify instructions, input data, and set the desired output format to craft the perfect prompt.
            </p>
          </div>
          <PromptGeneratorForm onGenerate={handleGeneratePrompt} isGenerating={isGenerating} />

          {isGenerating && <div className="mt-10"><LoadingSpinner /></div>}

          <div id="generated-prompt-display">
            {generatedPrompt && !isGenerating && <GeneratedPromptDisplay prompt={generatedPrompt} />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
