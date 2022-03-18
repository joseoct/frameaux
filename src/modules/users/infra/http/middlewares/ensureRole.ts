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
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    if (!roles.includes(user.role.name)) {
      throw new AppError('Permission denied', 401);
    }

    next();
  };
}
