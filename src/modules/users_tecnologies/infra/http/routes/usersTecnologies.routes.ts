import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UserTecnologyController from '../controllers/UserTecnologyController';

const usersTecnologiesRouter = Router();
const usersController = new UserTecnologyController();

usersTecnologiesRouter.use(ensureAuthenticated);

usersTecnologiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      tecnology_id: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersTecnologiesRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      tecnology_id: Joi.string().required(),
    },
  }),
  usersController.update,
);

usersTecnologiesRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      tecnology_id: Joi.string().required(),
    },
  }),
  usersController.delete,
);

export default usersTecnologiesRouter;
