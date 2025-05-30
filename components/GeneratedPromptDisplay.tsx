
import React, { useState, useEffect } from 'react';
import Button from './Button';

interface GeneratedPromptDisplayProps {
  prompt: string | null;
}

const GeneratedPromptDisplay: React.FC<GeneratedPromptDisplayProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!prompt) {
    return null;
  }

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(prompt)
        .then(() => setCopied(true))
        .catch(err => console.error('Failed to copy text: ', err));
    } else {
        // Fallback for older browsers or insecure contexts
        const textArea = document.createElement("textarea");
        textArea.value = prompt;
        textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = "0";
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
  };

  return (
    <div className="mt-10 bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-indigo-300">Your Generated Prompt</h2>
        <Button 
          onClick={handleCopy} 
          variant={copied ? 'secondary' : 'outline'}
          size="sm"
          icon={copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          )}
        >
          {copied ? 'Copied!' : 'Copy Prompt'}
        </Button>
      </div>
      <div className="bg-gray-700/70 p-4 rounded-lg min-h-[120px] text-gray-200 whitespace-pre-wrap leading-relaxed text-sm sm:text-base border border-gray-600">
        {prompt}
      </div>
      <p className="mt-3 text-xs text-gray-400 text-center">
        You can now use this prompt with your favorite AI model or creative tool.
      </p>
    </div>
  );
};

export default GeneratedPromptDisplay;