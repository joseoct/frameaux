import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import StudentTechnologyController from '../controllers/StudentTechnologyController';

const studentsTechnologiesRouter = Router();
const studentTechnologyController = new StudentTechnologyController();

studentsTechnologiesRouter.use(ensureAuthenticated);

studentsTechnologiesRouter.get(
  '/:technology_id',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().required(),
    },
  }),
  studentTechnologyController.show,
);

studentsTechnologiesRouter.post(
  '/:technology_id',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().required(),
    },
  }),
  studentTechnologyController.create,
);

studentsTechnologiesRouter.patch(
  '/:technology_id/:result',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().required(),
      result: Joi.number().required(),
    },
  }),
  studentTechnologyController.update,
);

studentsTechnologiesRouter.delete(
  '/:technology_id',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().required(),
    },
  }),
  studentTechnologyController.delete,
);

export default studentsTechnologiesRouter;
