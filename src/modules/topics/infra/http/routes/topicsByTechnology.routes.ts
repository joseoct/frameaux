import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@modules/users/infra/http/middlewares/ensureRole';
import TopicsByTechnology from '../controllers/TopicsByTechnologyController';

const topicsByTechnologies = Router();
const topicsByTechnology = new TopicsByTechnology();

topicsByTechnologies.use(ensureAuthenticated);

topicsByTechnologies.get(
  '/:technology_id/topics',
  celebrate({
    [Segments.PARAMS]: {
      technology_id: Joi.string().required(),
    },
  }),
  topicsByTechnology.index,
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
  topicsByTechnology.create,
);

export default topicsByTechnologies;
