export const ERROR_MESSAGES = {
  requiredField(fieldName: string): string {
    return `${fieldName} is required.`;
  },
  sentenceLength(
    fieldName: string,
    minLength: number,
    maxLength: number = 0
  ): string {
    return `Please enter a ${fieldName} with at least ${minLength} characters${
      maxLength > 0 ? ` and at most ${maxLength}` : ''
    }.`;
  },
  wordLength: 'Each word should be up to 20 characters long.',
  uniqueChoices: 'Please ensure all choices are unique.',
  minimumQuestions: 'Please add at least one question.',
  minimumChoices: 'Each question should have at least two options.',
  chooseAnswer: 'Please select an answer.',

  invalidVideoFileType:
    'Invalid file type. Only video files (e.g., MP4, AVI, MOV) are allowed.',

  generalValidation: 'Please address the validation errors before saving.',
};
