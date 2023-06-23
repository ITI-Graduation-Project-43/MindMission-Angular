import { Injectable } from '@angular/core';
import {
  Lesson,
  QuizQuestion,
} from '../../CourseUpload/Components/create-chapter-lesson/create-chapter-lesson.component';

@Injectable({ providedIn: 'root' })
export class ChapterValidationService {
  private validAttachmentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.ms-excel',
    'application/zip',
    'application/text',
    'text/plain',
  ];

  validateWordLength(input: string): boolean {
    const words = input.split(' ');
    return !words.some((word) => word.length > 20);
  }

  validateSentenceLength(
    input: string,
    minLength: number,
    maxLength: number = Number.MAX_VALUE
  ): boolean {
    return input.trim().length >= minLength && input.trim().length <= maxLength;
  }

  isValidFile(file: File | undefined): boolean {
    return !!file && this.validAttachmentTypes.includes(file.type);
  }

  isValidVideoFile(file: File | undefined): boolean {
    return !!file && !!file?.type && file.type?.startsWith('video/');
  }

  isValidName(name: string): boolean {
    const regex = /^[A-Za-z0-9\s]*$/;
    return regex.test(name);
  }

  isValidQuizQuestion(question: QuizQuestion): boolean {
    const nonBlankChoices = question.choices.filter(
      (choice) => choice.trim() !== ''
    );
    const uniqueChoices = Array.from(
      new Set(
        nonBlankChoices.map((choice) => choice.replace(/\s+/g, ' ').trim())
      )
    );
    const isValidQuestionText = !!question.questionText;
    const isValidChoiceCount = nonBlankChoices.length >= 2;
    const isValidCorrectAnswer =
      !!question.correctAnswer &&
      nonBlankChoices.includes(question.correctAnswer);
    const areChoicesUnique = uniqueChoices.length === nonBlankChoices.length;

    return (
      isValidQuestionText &&
      isValidChoiceCount &&
      isValidCorrectAnswer &&
      areChoicesUnique
    );
  }

  hasEnoughChoices(choices: string[]): boolean {
    return choices.filter((choice) => choice.trim() !== '').length >= 2;
  }

  areChoicesUnique(choices: string[]): boolean {
    const nonBlankChoices = choices.filter((choice) => choice.trim() !== '');
    return new Set(nonBlankChoices).size === nonBlankChoices.length;
  }

  validateQuestion(question: QuizQuestion): boolean {
    return (
      question.questionText !== '' &&
      this.validateSentenceLength(question.questionText, 10) &&
      this.validateWordLength(question.questionText) &&
      this.hasEnoughChoices(question.choices) &&
      this.areChoicesUnique(question.choices) &&
      question.correctAnswer !== null
    );
  }
}
