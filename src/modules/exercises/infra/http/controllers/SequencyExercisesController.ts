import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSequencyExerciseService from '@modules/exercises/services/CreateSequencyExerciseService';

export default class SequencyExercisesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { level_id } = request.params;
      const { question, type, correct_answer } = request.body;

      const correctAnswerConverted = correct_answer.replace(/'/g, '"');

      const createSequencyExercise = container.resolve(
        CreateSequencyExerciseService,
      );

      const exercise = await createSequencyExercise.execute({
        level_id,
        question,
        type,
        correct_answer: JSON.parse(correctAnswerConverted),
      });

      return response.json(exercise);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
