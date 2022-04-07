import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ExercisesTestByTechnologyController from '../controllers/ExercisesTestByTechnologyController ';

const exercisesTestByTechnologyRouter = Router();
const exercisesTestByTechnologyController = new ExercisesTestByTechnologyController();

exercisesTestByTechnologyRouter.use(ensureAuthenticated);

exercisesTestByTechnologyRouter.get(
  '/:technology_id/test',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().uuid().required(),
    },
  }),
  exercisesTestByTechnologyController.get,
);

export default exercisesTestByTechnologyRouter;
