import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserTecnologyService from '@modules/users_tecnologies/services/CreateUserTecnologyService';
import IncreaseCurrentLayerOfUserTecnology from '@modules/users_tecnologies/services/IncreaseCurrentLayerOfUserTecnology';

export default class UserTecnologyController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { tecnology_id } = request.body;

      const createUserTecnology = container.resolve(CreateUserTecnologyService);

      const user_tecnology = await createUserTecnology.execute({
        user_id,
        tecnology_id,
      });

      return response.json(user_tecnology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { tecnology_id } = request.body;

      const increaseCurrentLayerOfUserTecnology = container.resolve(
        IncreaseCurrentLayerOfUserTecnology,
      );

      const user_tecnology = await increaseCurrentLayerOfUserTecnology.execute({
        user_id,
        tecnology_id,
      });

      return response.json(user_tecnology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
