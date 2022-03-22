import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@modules/users/infra/http/middlewares/ensureRole';
import TopicsByTechnologies from '../controllers/TopicsByTechnologiesController';

const topicsByTechnologies = Router();
const topicsController = new TopicsByTechnologies();

topicsByTechnologies.use(ensureAuthenticated);

topicsByTechnologies.get(
  '/:technology_id/topics',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().required(),
    },
  }),
  topicsController.index,
);

topicsByTechnologies.post(
  '/:technology_id',
  ensureRole(['content_creator']),
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      explanation: Joi.string().required(),
      layer: Joi.number().required(),
    },
  }),
  topicsController.create,
);

export default topicsByTechnologies;
