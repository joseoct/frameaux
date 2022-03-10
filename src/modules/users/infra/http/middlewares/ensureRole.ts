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
    const showProfile = container.resolve(ShowProfileService);

    const user_id = req.user.id;

    const user = await showProfile.execute({ user_id });

    if (!roles.includes(user.role.name)) {
      throw new AppError('Parece que você está indo longe demais...', 401);
    }

    if (roles) next();
  };
}
