import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListContentCreatorsService from '@modules/users/services/ListContentCreatorsService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, role_id } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
        role_id,
      });

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const ListContentCreators = container.resolve(ListContentCreatorsService);

      const contentCreators = await ListContentCreators.execute();

      return response.json(contentCreators);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
