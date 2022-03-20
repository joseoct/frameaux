import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllTechnologiesByUserService from '@modules/technologies/services/ListAllTechnologiesByUserService';

export default class TechnologiesByUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;

      const listTechnologiesByUser = container.resolve(
        ListAllTechnologiesByUserService,
      );

      const technologiesByUser = await listTechnologiesByUser.execute({
        user_id,
      });

      return response.json(technologiesByUser);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
