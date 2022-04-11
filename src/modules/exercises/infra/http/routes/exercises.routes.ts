import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@modules/users/infra/http/middlewares/ensureRole';
import ExercisesController from '../controllers/ExercisesController';

const exercisesRouter = Router();
const exercisesController = new ExercisesController();

exercisesRouter.use(ensureAuthenticated);

exercisesRouter.use(ensureRole(['content_creator']));

exercisesRouter.delete(
  '/:exercise_id',
  celebrate({
    [Segments.PARAMS]: {
      exercise_id: Joi.string().uuid().required(),
    },
  }),
  exercisesController.delete,
);

export default exercisesRouter;
