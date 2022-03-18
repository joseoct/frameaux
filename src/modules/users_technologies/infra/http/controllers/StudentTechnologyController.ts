import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStudentTechnologyService from '@modules/users_technologies/services/CreateStudentTechnologyService';
import IncreaseCurrentLayerOfStudentTechnology from '@modules/users_technologies/services/IncreaseCurrentLayerOfStudentTechnology';
import DeleteStudentTechnologyService from '@modules/users_technologies/services/DeleteStudentTechnologyService';

export default class StudentTechnologyController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const student_id = request.user.id;
      const { technology_id } = request.body;

      const createUserTechnology = container.resolve(
        CreateStudentTechnologyService,
      );

      const student_technology = await createUserTechnology.execute({
        user_id: student_id,
        technology_id,
      });

      return response.json(student_technology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const student_id = request.user.id;
      const { technology_id } = request.body;

      const increaseCurrentLayerOfUserTechnology = container.resolve(
        IncreaseCurrentLayerOfStudentTechnology,
      );

      const student_technology = await increaseCurrentLayerOfUserTechnology.execute(
        {
          user_id: student_id,
          technology_id,
        },
      );

      return response.json(student_technology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const student_id = request.user.id;
      const { technology_id } = request.body;

      const deleteStudentTechnology = container.resolve(
        DeleteStudentTechnologyService,
      );

      const student_technology = await deleteStudentTechnology.execute({
        user_id: student_id,
        technology_id,
      });

      return response.json(student_technology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
