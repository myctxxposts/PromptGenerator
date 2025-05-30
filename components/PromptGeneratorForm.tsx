
import React, { useState, useCallback } from 'react';
import { PromptOptions, PromptStyle, PromptAction, PromptLength } from '../types';
import { PROMPT_STYLES, PROMPT_ACTIONS, PROMPT_LENGTHS, DEFAULT_PROMPT_OPTIONS } from '../constants';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import TextAreaInput from './TextAreaInput';
import Button from './Button';

interface PromptGeneratorFormProps {
  onGenerate: (options: PromptOptions) => void;
  isGenerating: boolean;
}

const TopicIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.056 14.06a2.25 2.25 0 00-1.591.659H4.5V18h1.572A2.25 2.25 0 008.05 14.06l3.685-3.685a2.25 2.25 0 00.659-1.591V3.104A2.25 2.25 0 009.75 3.104zM8.05 14.06L6 16.11m0 0L3.949 14.06M14.25 3.104v5.714a2.25 2.25 0 00.659 1.591l3.685 3.685a2.25 2.25 0 011.591.659H21V18h-1.572a2.25 2.25 0 01-1.977-3.939L14.25 10.374V3.104a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v.47M15.95 14.06L18 16.11m0 0l2.051-2.051M6 18H4.5v2.25h1.5V18zm9.75 0h1.5V20.25h-1.5V18z" /></svg>
);
const ActionIcon: React.FC = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const StyleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.39m3.421 1.756a15.975 15.975 0 001.622-3.389m-5.444 2.04a15.982 15.982 0 00-3.389-1.619m12.07 6.244a4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 00-3.388-1.62m5.038 1.649c.143.347.22.729.22 1.128a4.501 4.501 0 01-8.4 2.245M15 9.75a3 3 0 005.78-1.128 2.25 2.25 0 012.4-2.245 4.5 4.5 0 00-8.4 2.245c0 .399.078.78.22 1.128zm0 0A15.99 15.99 0 0113.38 8.13M15 9.75a15.99 15.99 0 00-1.622 3.389m3.421-1.756a15.975 15.975 0 01-1.622 3.389" /></svg>
);
const LengthIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>
);
const KeywordsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" /></svg>
);
const AudienceIcon: React.FC = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
);
const InstructionsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11-.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.019.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.15-.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);


const PromptGeneratorForm: React.FC<PromptGeneratorFormProps> = ({ onGenerate, isGenerating }) => {
  const [formState, setFormState] = useState<PromptOptions>(DEFAULT_PROMPT_OPTIONS);
  const [errors, setErrors] = useState<Partial<Record<keyof PromptOptions, string>>>({});

  const handleChange = useCallback(<K extends keyof PromptOptions,>(field: K, value: PromptOptions[K]) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PromptOptions, string>> = {};
    if (!formState.topic.trim()) {
      newErrors.topic = "Topic cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onGenerate(formState);
    }
  };
  
  const handleReset = () => {
    setFormState(DEFAULT_PROMPT_OPTIONS);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-semibold text-indigo-300 mb-6 text-center">Craft Your Prompt</h2>
      
      <TextInput
        label="Primary Topic or Subject"
        id="topic"
        placeholder="e.g., climate change solutions, a medieval fantasy quest"
        value={formState.topic}
        onChange={(e) => handleChange('topic', e.target.value)}
        error={errors.topic}
        required
        leftIcon={<TopicIcon />}
      />

      <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
        <SelectInput
          label="Desired Action"
          id="action"
          value={formState.action}
          onChange={(e) => handleChange('action', e.target.value as PromptAction)}
          options={PROMPT_ACTIONS}
          leftIcon={<ActionIcon />}
        />
        <SelectInput
          label="Preferred Style"
          id="style"
          value={formState.style}
          onChange={(e) => handleChange('style', e.target.value as PromptStyle)}
          options={PROMPT_STYLES}
          leftIcon={<StyleIcon />}
        />
      </div>
      
      <SelectInput
        label="Output Length"
        id="length"
        value={formState.length}
        onChange={(e) => handleChange('length', e.target.value as PromptLength)}
        options={PROMPT_LENGTHS}
        leftIcon={<LengthIcon />}
      />
      
      <TextInput
        label="Key Themes or Keywords (comma-separated)"
        id="keywords"
        placeholder="e.g., sustainability, artificial intelligence, character development"
        value={formState.keywords}
        onChange={(e) => handleChange('keywords', e.target.value)}
        leftIcon={<KeywordsIcon />}
      />

      <TextInput
        label="Target Audience (Optional)"
        id="targetAudience"
        placeholder="e.g., industry professionals, general public, IT employee with X years exp"
        value={formState.targetAudience || ''}
        onChange={(e) => handleChange('targetAudience', e.target.value)}
        leftIcon={<AudienceIcon />}
      />

      <TextAreaInput
        label="Specific Instructions or Constraints (Optional)"
        id="customInstructions"
        placeholder="e.g., Maintain a hopeful tone. Include at least three examples. Avoid jargon."
        value={formState.customInstructions || ''}
        onChange={(e) => handleChange('customInstructions', e.target.value)}
        // No specific icon for this one, but could add 'InstructionsIcon' if desired
      />

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-5 border-t border-gray-700">
        <Button type="submit" isLoading={isGenerating} className="w-full sm:flex-1" icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17.437 14.846a4.5 4.5 0 01-3.09 3.09L11.5 18.75l.813-2.846a4.5 4.5 0 013.09-3.09L18.25 12z" />
          </svg>
        }>
          Generate Prompt
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset} className="w-full sm:flex-1" disabled={isGenerating} icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        }>
          Reset Fields
        </Button>
      </div>
    </form>
  );
};

export default PromptGeneratorForm;