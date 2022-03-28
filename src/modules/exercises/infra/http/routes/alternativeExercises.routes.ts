import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@modules/users/infra/http/middlewares/ensureRole';
import AlternativesExercisesController from '../controllers/AlternativeExercisesController';

const alternativeExercisesRouter = Router();
const alternativeExercisesController = new AlternativesExercisesController();

alternativeExercisesRouter.use(ensureAuthenticated);

alternativeExercisesRouter.use(ensureRole(['content_creator']));

alternativeExercisesRouter.post(
  '/:level_id/alternative-exercise',
  celebrate({
    [Segments.PARAMS]: {
      level_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      question: Joi.string().required(),
      type: Joi.string().required(),
      answer: Joi.string().required(),
      correct_answer: Joi.string().required(),
    },
  }),
  alternativeExercisesController.create,
);

export default alternativeExercisesRouter;
