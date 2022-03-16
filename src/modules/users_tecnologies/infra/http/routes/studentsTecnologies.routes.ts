import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import StudentTecnologyController from '../controllers/StudentTecnologyController';

const studentsTecnologiesRouter = Router();
const studentTecnologyController = new StudentTecnologyController();

studentsTecnologiesRouter.use(ensureAuthenticated);

studentsTecnologiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      tecnology_id: Joi.string().required(),
    },
  }),
  studentTecnologyController.create,
);

studentsTecnologiesRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      tecnology_id: Joi.string().required(),
    },
  }),
  studentTecnologyController.update,
);

studentsTecnologiesRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      tecnology_id: Joi.string().required(),
    },
  }),
  studentTecnologyController.delete,
);

export default studentsTecnologiesRouter;
