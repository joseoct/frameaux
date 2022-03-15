import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListContentCreatorsService from '@modules/users/services/ListContentCreatorsService';

export default class ContentCreatorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { page } = request.query;

      const ListContentCreators = container.resolve(ListContentCreatorsService);

      const contentCreators = await ListContentCreators.execute({
        page: Number(page),
      });

      return response.json(contentCreators);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
