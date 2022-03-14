import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { User } from '@prisma/client';
import authConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

/**
 * Verifique que na linha de declaração da função execute o retoro é uma inter-
 * face implicita ->
 * interface User {
 *  user: User;
 *  token: string
 * }
 */

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    /**
     * Preciso comparar password com user.password, o bcryptjs tem um metodo
     * chamado compare para comprar uma senha nao criptografada com uma senha
     * nao-criptografada, o metodo retorna true ou false.
     */
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // Usuario autenticado, hora de criar um token da sessao

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
