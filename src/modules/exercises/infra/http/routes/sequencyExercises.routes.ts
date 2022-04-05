import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@modules/users/infra/http/middlewares/ensureRole';
import SequencysExercisesController from '../controllers/SequencyExercisesController';

const sequencyExercisesRouter = Router();
const sequencyExercisesController = new SequencysExercisesController();

sequencyExercisesRouter.use(ensureAuthenticated);

sequencyExercisesRouter.use(ensureRole(['content_creator']));

sequencyExercisesRouter.post(
  '/:level_id/sequency-exercise',
  celebrate({
    [Segments.PARAMS]: {
      level_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      question: Joi.string().required(),
      type: Joi.string().required(),
      correct_answer: Joi.string().required(),
    },
  }),
  sequencyExercisesController.create,
);

export default sequencyExercisesRouter;
