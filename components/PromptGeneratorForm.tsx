

import React, { useState, useCallback } from 'react';
import { PromptOptions, PromptStyle, PromptAction, PromptLength, PromptExamples } from '../types'; // Removed PromptOutputFormat
import { PROMPT_STYLES, PROMPT_ACTIONS, PROMPT_LENGTHS, PROMPT_EXAMPLES, DEFAULT_PROMPT_OPTIONS, ACTION_SPECIFIC_INSTRUCTIONS_TEMPLATES } from '../constants'; // Removed PROMPT_OUTPUT_FORMATS
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import TextAreaInput from './TextAreaInput';
import Button from './Button';

interface PromptGeneratorFormProps {
  onGenerate: (options: PromptOptions) => void;
  isGenerating: boolean;
}

// Existing Icons
const TopicIcon: React.FC = () => ( // Will be used for "Input" section
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
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
const ExamplesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const KeywordsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" /></svg>
);
const PersonaIcon: React.FC = () => ( // For AI Role
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const AudienceIcon: React.FC = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m0 0a9.094 9.094 0 013.741-.479m0 0c0 2.21-1.5 4.5-3.001 4.5A7.497 7.497 0 0112 15.75a7.497 7.497 0 01-3.75-.48m0 0c0 2.21-1.5 4.5-3.001 4.5A7.497 7.497 0 016 15.75a7.497 7.497 0 01-3.75-.48m0 0c0-1.583 1.56-2.922 3.75-3.48M3.75 11.625c0-1.583 1.56-2.922 3.75-3.48m0 0V6.75A2.25 2.25 0 019.75 4.5h4.5A2.25 2.25 0 0116.5 6.75v1.395m0 0c1.281.54 2.25 1.502 2.25 2.59V15a3 3 0 01-3 3m-3-6V6.75A2.25 2.25 0 009.75 4.5h-.541"  /></svg>
);
const InstructionsIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11-.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.019.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.15-.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

// New Icons
const ContextIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const OutputFormatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

const FormSectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="pt-6 pb-2 border-b border-gray-700 mb-6">
    <h3 className="text-xl font-semibold text-indigo-300">{title}</h3>
  </div>
);


const PromptGeneratorForm: React.FC<PromptGeneratorFormProps> = ({ onGenerate, isGenerating }) => {
  const [formState, setFormState] = useState<PromptOptions>(DEFAULT_PROMPT_OPTIONS);
  const [errors, setErrors] = useState<Partial<Record<keyof PromptOptions, string>>>({});

  const handleChange = useCallback(<K extends keyof PromptOptions,>(field: K, value: PromptOptions[K]) => {
    setFormState(prev => {
      const newState = { ...prev, [field]: value };
      if (field === 'action') {
        const template = ACTION_SPECIFIC_INSTRUCTIONS_TEMPLATES[value as PromptAction];
        if (template !== undefined) { // Check if template exists, even if it's an empty string
          newState.customInstructions = template;
        }
        // If no template is explicitly defined for the action, customInstructions in newState will
        // be what prev.customInstructions was. This preserves manually entered text.
      }
      return newState;
    });

    if (errors[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    }
  }, [errors]); 

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PromptOptions, string>> = {};
    if (!formState.topic.trim()) { 
      newErrors.topic = "Input (topic/question) cannot be empty.";
    }
    if (!formState.action) {
        newErrors.action = "Primary Task/Action must be selected.";
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
    <form onSubmit={handleSubmit} className="space-y-0 bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700">
          
      {/* Section 1: AI Role */}
      <FormSectionTitle title="AI Role" />
      <TextInput
        label="AI Role / Persona"
        id="persona"
        placeholder="e.g., a seasoned travel blogger, an expert data scientist"
        value={formState.persona || ''}
        onChange={(e) => handleChange('persona', e.target.value)}
        leftIcon={<PersonaIcon />}
        className="mb-6"
      />

      {/* Section 2: Input */}
      <FormSectionTitle title="Input" />
      <TextAreaInput
        label="Main Input / Topic / Question / Data"
        id="topic" 
        placeholder="Enter the core text, question, or data the AI should work on."
        value={formState.topic}
        onChange={(e) => handleChange('topic', e.target.value)}
        error={errors.topic}
        required
        leftIcon={<TopicIcon />}
        className="mb-6"
        rows={5}
      />

      {/* Section 3: Instructions */}
      <FormSectionTitle title="Instructions" />
      <SelectInput
        label="Primary Task/Action on Input"
        id="action"
        value={formState.action}
        onChange={(e) => handleChange('action', e.target.value as PromptAction)}
        options={PROMPT_ACTIONS}
        leftIcon={<ActionIcon />}
        required
        error={errors.action}
        className="mb-6"
      />
      <TextAreaInput
        label="Specific Instructions & Constraints"
        id="customInstructions"
        placeholder="List required actions or constraints, e.g.:&#10;Summarize the main arguments.&#10;Identify three potential risks.&#10;Ensure the tone is optimistic."
        value={formState.customInstructions || ''}
        onChange={(e) => handleChange('customInstructions', e.target.value)}
        leftIcon={<InstructionsIcon />}
        className="mb-6"
        rows={6} 
      />
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-1 mb-1">
        <SelectInput
          label="Preferred Tone/Style"
          id="style"
          value={formState.style}
          onChange={(e) => handleChange('style', e.target.value as PromptStyle)}
          options={PROMPT_STYLES}
          leftIcon={<StyleIcon />}
        />
        <SelectInput
          label="Desired Output Length"
          id="length"
          value={formState.length}
          onChange={(e) => handleChange('length', e.target.value as PromptLength)}
          options={PROMPT_LENGTHS}
          leftIcon={<LengthIcon />}
        />
      </div>
       <SelectInput
          label="Include Examples in Output?"
          id="addExamples"
          value={formState.addExamples}
          onChange={(e) => handleChange('addExamples', e.target.value as PromptExamples)}
          options={PROMPT_EXAMPLES}
          leftIcon={<ExamplesIcon />}
          className="mb-6"
        />

      {/* Section 4: Context */}
      <FormSectionTitle title="Context" />
      <TextAreaInput
        label="Background Information / Reference Material"
        id="context"
        placeholder="Provide any relevant background details, existing text, or reference points the AI should use."
        value={formState.context || ''}
        onChange={(e) => handleChange('context', e.target.value)}
        leftIcon={<ContextIcon />}
        className="mb-6"
        rows={3}
      />
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-1 mb-6">
        <TextInput
          label="Relevant Keywords/Themes"
          id="keywords"
          placeholder="e.g., sustainability, AI ethics"
          value={formState.keywords}
          onChange={(e) => handleChange('keywords', e.target.value)}
          leftIcon={<KeywordsIcon />}
        />
        <TextInput
          label="Intended Audience"
          id="targetAudience"
          placeholder="e.g., general public, software developers"
          value={formState.targetAudience || ''}
          onChange={(e) => handleChange('targetAudience', e.target.value)}
          leftIcon={<AudienceIcon />}
        />
      </div>
      
      {/* Section 5: Expected Output */}
      <FormSectionTitle title="Expected Output" />
      <TextInput
        label="Expected Output Format/Structure"
        id="outputFormat"
        placeholder="e.g., JSON, Markdown list, comma-separated values"
        value={formState.outputFormat || ''}
        onChange={(e) => handleChange('outputFormat', e.target.value)}
        leftIcon={<OutputFormatIcon />}
        className="mb-6"
      />
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-8 mt-4 border-t border-gray-700">
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
