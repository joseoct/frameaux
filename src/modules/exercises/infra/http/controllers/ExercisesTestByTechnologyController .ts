import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListExercisesTestByTechnologyService from '@modules/exercises/services/ListExercisesTestByTechnologyService';

export default class AlternativeExercisesController {
  public async get(request: Request, response: Response): Promise<Response> {
    try {
      const { technology_id } = request.params;

      const listExercisesTestByTechnology = container.resolve(
        ListExercisesTestByTechnologyService,
      );

      const exercise = await listExercisesTestByTechnology.execute({
        technology_id,
      });

      return response.json(exercise);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
