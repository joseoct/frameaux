import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const session = container.resolve(CreateSessionService);

    /**
     * Deixe implicito qual variavel esta chegando da resposta do seu service
     * no caso, o user
     */
    const { user, token } = await session.execute({
      email,
      password,
    });

    // usamos o classToClass para sobrepor a classe que criamos com o class-transformer
    // la podemos dar @Exclude() nos campos que queremos que o front n receba

    return response.json({ user: classToClass(user), token });
  }
}
