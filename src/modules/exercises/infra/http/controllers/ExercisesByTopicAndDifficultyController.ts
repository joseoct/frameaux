import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListExercisesByTopicAndDifficultyService from '@modules/exercises/services/ListExercisesByTopicAndDifficultyService';

export default class AlternativeExercisesController {
  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const { topic_id, difficulty } = request.params;
      const student_id = request.user.id;

      const listExercisesByTopicAndDifficultyService = container.resolve(
        ListExercisesByTopicAndDifficultyService,
      );

      const exercise = await listExercisesByTopicAndDifficultyService.execute({
        topic_id,
        difficulty: Number(difficulty),
        student_id,
      });

      return response.json(exercise);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
