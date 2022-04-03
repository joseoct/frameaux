import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ExercisesByTopicAndDifficultyController from '../controllers/ExercisesByTopicAndDifficultyController';

const exercisesByTopicAndDifficultyRouter = Router();
const exercisesByTopicAndDifficultyController = new ExercisesByTopicAndDifficultyController();

exercisesByTopicAndDifficultyRouter.use(ensureAuthenticated);

exercisesByTopicAndDifficultyRouter.get(
  '/:topic_id/:difficulty',
  celebrate({
    [Segments.PARAMS]: {
      topic_id: Joi.string().uuid().required(),
      difficulty: Joi.string().required(),
    },
  }),
  exercisesByTopicAndDifficultyController.get,
);

export default exercisesByTopicAndDifficultyRouter;
