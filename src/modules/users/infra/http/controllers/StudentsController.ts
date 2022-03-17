import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStudentService from '@modules/users/services/CreateStudentService';

export default class ContentCreatorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createContentCreatorService = container.resolve(
        CreateStudentService,
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
}
