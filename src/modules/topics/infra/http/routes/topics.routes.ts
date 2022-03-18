import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@modules/users/infra/http/middlewares/ensureRole';
import TopicsController from '../controllers/TopicsController';

const topicsRouter = Router();
const topicsController = new TopicsController();

topicsRouter.use(ensureAuthenticated);

topicsRouter.get(
  '/:id/topics',
  ensureRole(['admin', 'content_creator']),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  topicsController.index,
);

topicsRouter.post(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      explanation: Joi.string().required(),
      layer: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  topicsController.create,
);

export default topicsRouter;
