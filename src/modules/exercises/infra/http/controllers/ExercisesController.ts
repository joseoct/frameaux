import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteExerciseService from '@modules/exercises/services/DeleteExerciseService';

export default class ExercisesController {
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { exercise_id } = request.params;

      const deleteExerciseService = container.resolve(DeleteExerciseService);

      const exercise = await deleteExerciseService.execute({
        exercise_id,
      });

      return response.json(exercise);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
