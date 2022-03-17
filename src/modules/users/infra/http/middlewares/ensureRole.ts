import { Request, NextFunction, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ShowProfileService from '@modules/users/services/ShowProfileService';

export default function ensureAdmin(roles: Array<string>) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user_id = req.user.id;

      const showProfile = container.resolve(ShowProfileService);

      const user = await showProfile.execute({ user_id });

      if (!roles.includes(user.role.name)) {
        throw new AppError('Parece que você está indo longe demais...', 401);
      }

      next();
    } catch (error) {
      throw new AppError('Erro ao encontrar cargo do usuário', 401);
    }
  };
}
