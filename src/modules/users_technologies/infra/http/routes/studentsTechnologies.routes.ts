import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import StudentTechnologyController from '../controllers/StudentTechnologyController';

const studentsTechnologiesRouter = Router();
const studentTechnologyController = new StudentTechnologyController();

studentsTechnologiesRouter.use(ensureAuthenticated);

studentsTechnologiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      technology_id: Joi.string().required(),
    },
  }),
  studentTechnologyController.create,
);

studentsTechnologiesRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      technology_id: Joi.string().required(),
    },
  }),
  studentTechnologyController.update,
);

studentsTechnologiesRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      technology_id: Joi.string().required(),
    },
  }),
  studentTechnologyController.delete,
);

export default studentsTechnologiesRouter;
