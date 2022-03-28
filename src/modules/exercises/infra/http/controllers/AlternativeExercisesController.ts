import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAlternativeExerciseService from '@modules/exercises/services/CreateAlternativeExerciseService';

export default class AlternativeExercisesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { level_id } = request.params;
      const { question, type, answer, correct_answer } = request.body;

      const answerConverted = answer.replace(/'/g, '"');

      const createAlternativeExercise = container.resolve(
        CreateAlternativeExerciseService,
      );

      const exercise = await createAlternativeExercise.execute({
        level_id,
        question,
        type,
        answer: JSON.parse(answerConverted),
        correct_answer,
      });

      return response.json(exercise);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
