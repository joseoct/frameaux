import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@modules/users/infra/http/middlewares/ensureRole';
import LevelsByTopicController from '../controllers/LevelsByTopicController';

const levelsByTopicRouter = Router();
const levelsByTopicController = new LevelsByTopicController();

levelsByTopicRouter.use(ensureAuthenticated);

levelsByTopicRouter.post(
  '/:topic_id',
  ensureRole(['content_creator']),
  celebrate({
    [Segments.PARAMS]: {
      topic_id: Joi.string().required(),
    },
  }),
  levelsByTopicController.create,
);

levelsByTopicRouter.get(
  '/:topic_id/levels',
  celebrate({
    [Segments.PARAMS]: {
      topic_id: Joi.string().required(),
    },
  }),
  levelsByTopicController.index,
);

export default levelsByTopicRouter;
