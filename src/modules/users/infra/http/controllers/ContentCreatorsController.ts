import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListContentCreatorsService from '@modules/users/services/ListContentCreatorsService';
import CreateContentCreatorService from '@modules/users/services/CreateContentCreatorService';

export default class ContentCreatorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createContentCreatorService = container.resolve(
        CreateContentCreatorService,
      );

      const contentCreator = await createContentCreatorService.execute({
        name,
        email,
        password,
      });

      return response.json(contentCreator);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { page } = request.query;

      const ListContentCreators = container.resolve(ListContentCreatorsService);

      const {
        contentCreatorsPaginatedByTen,
        totalOfContentCreators,
      } = await ListContentCreators.execute({
        page: Number(page),
      });

      response.set('x-total-count', String(totalOfContentCreators));

      return response.json(contentCreatorsPaginatedByTen);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
