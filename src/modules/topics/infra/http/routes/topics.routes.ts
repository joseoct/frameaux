import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import TopicsController from '../controllers/TopicsController';

const topicsRouter = Router();
const topicsController = new TopicsController();

topicsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  topicsController.show,
);

export default topicsRouter;
