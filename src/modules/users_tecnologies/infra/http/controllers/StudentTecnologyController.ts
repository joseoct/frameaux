import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStudentTecnologyService from '@modules/users_tecnologies/services/CreateStudentTecnologyService';
import IncreaseCurrentLayerOfStudentTecnology from '@modules/users_tecnologies/services/IncreaseCurrentLayerOfStudentTecnology';
import DeleteStudentTecnologyService from '@modules/users_tecnologies/services/DeleteStudentTecnologyService';

export default class StudentTecnologyController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const student_id = request.user.id;
      const { tecnology_id } = request.body;

      const createUserTecnology = container.resolve(
        CreateStudentTecnologyService,
      );

      const student_tecnology = await createUserTecnology.execute({
        user_id: student_id,
        tecnology_id,
      });

      return response.json(student_tecnology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const student_id = request.user.id;
      const { tecnology_id } = request.body;

      const increaseCurrentLayerOfUserTecnology = container.resolve(
        IncreaseCurrentLayerOfStudentTecnology,
      );

      const student_tecnology = await increaseCurrentLayerOfUserTecnology.execute(
        {
          user_id: student_id,
          tecnology_id,
        },
      );

      return response.json(student_tecnology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const student_id = request.user.id;
      const { tecnology_id } = request.body;

      const deleteStudentTecnology = container.resolve(
        DeleteStudentTecnologyService,
      );

      const student_tecnology = await deleteStudentTecnology.execute({
        user_id: student_id,
        tecnology_id,
      });

      return response.json(student_tecnology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
