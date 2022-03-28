import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import LevelsController from '../controllers/LevelsController';

const levelsRouter = Router();
const levelsController = new LevelsController();

levelsRouter.get(
  '/:level_id',
  celebrate({
    [Segments.PARAMS]: {
      level_id: Joi.string().required(),
    },
  }),
  levelsController.show,
);

export default levelsRouter;
