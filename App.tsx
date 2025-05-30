
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PromptGeneratorForm from './components/PromptGeneratorForm';
import GeneratedPromptDisplay from './components/GeneratedPromptDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { PromptOptions } from './types';

const App: React.FC = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generatePromptText = (options: PromptOptions): string => {
    let promptSegments: string[] = [];

    // Action and Topic (Core)
    promptSegments.push(`${options.action} "${options.topic.trim()}".`);

    // Style
    promptSegments.push(`The desired style is ${options.style}.`);

    // Length
    promptSegments.push(`Aim for a ${options.length} response.`);

    // Keywords
    if (options.keywords && options.keywords.trim() !== "") {
      promptSegments.push(`Incorporate the following keywords or themes: ${options.keywords.trim()}.`);
    }

    // Target Audience
    if (options.targetAudience && options.targetAudience.trim() !== "") {
      promptSegments.push(`The target audience is ${options.targetAudience.trim()}.`);
    }
    
    // Custom Instructions
    if (options.customInstructions && options.customInstructions.trim() !== "") {
      promptSegments.push(`\nFollow these specific instructions or constraints:\n${options.customInstructions.trim()}`);
    }
    
    // Polite closing
    promptSegments.push(`\nPlease generate a comprehensive and well-structured response based on these requirements.`);
    
    return promptSegments.join("\n\n");
  };

  const handleGeneratePrompt = useCallback(async (options: PromptOptions) => {
    setIsGenerating(true);
    setGeneratedPrompt(null); 
    
    // Simulate processing time to show loading state
    // In a real scenario, this would be an API call or complex local processing
    await new Promise(resolve => setTimeout(resolve, 1200)); 
    
    const promptText = generatePromptText(options);
    setGeneratedPrompt(promptText);
    setIsGenerating(false);
    // Scroll to the generated prompt smoothly
    // Timeout ensures element is rendered before scrolling
    setTimeout(() => {
        const displayElement = document.getElementById('generated-prompt-display');
        if (displayElement) {
            displayElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No dependencies needed as generatePromptText is stable and options are passed in

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
              Craft the perfect prompt for any task. Fill in the details below, and let our generator build a tailored prompt to guide your AI or spark your imagination.
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