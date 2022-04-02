import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStudentTechnologyService from '@modules/users_technologies/services/CreateStudentTechnologyService';
import IncreaseCurrentLayerOfStudentTechnologyService from '@modules/users_technologies/services/IncreaseCurrentLayerOfStudentTechnologyService';
import DeleteStudentTechnologyService from '@modules/users_technologies/services/DeleteStudentTechnologyService';
import ShowStudentTechnologyService from '@modules/users_technologies/services/ShowStudentTechnologyService';

export default class StudentTechnologyController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const student_id = request.user.id;
      const { technology_id } = request.params;

      const showUserTechnology = container.resolve(
        ShowStudentTechnologyService,
      );

      const student_technology = await showUserTechnology.execute({
        user_id: student_id,
        technology_id,
      });

      return response.json(student_technology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const student_id = request.user.id;
      const { technology_id } = request.params;

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
      const { technology_id } = request.params;

      const increaseCurrentLayerOfUserTechnology = container.resolve(
        IncreaseCurrentLayerOfStudentTechnologyService,
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
      const { technology_id } = request.params;

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
