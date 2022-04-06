import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StudentTopicController from '../controllers/StudentTopicController';

const studentsTopicsRouter = Router();
const studentsTopicsController = new StudentTopicController();

studentsTopicsRouter.use(ensureAuthenticated);

studentsTopicsRouter.post(
  '/:topic_id',
  celebrate({
    [Segments.PARAMS]: {
      topic_id: Joi.string().uuid().required(),
    },
  }),
  studentsTopicsController.create,
);

studentsTopicsRouter.get(
  '/:topic_id',
  celebrate({
    [Segments.PARAMS]: {
      topic_id: Joi.string().uuid().required(),
    },
  }),
  studentsTopicsController.show,
);

studentsTopicsRouter.patch(
  '/:topic_id',
  celebrate({
    [Segments.PARAMS]: {
      topic_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      attention: Joi.boolean(),
    },
  }),
  studentsTopicsController.update,
);

export default studentsTopicsRouter;
