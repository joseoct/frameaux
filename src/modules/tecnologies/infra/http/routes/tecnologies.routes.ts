import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
// import ensureAuthenticated from '@modules/tecnologies/infra/http/middlewares/ensureAuthenticated';
import TecnologiesController from '../controllers/TecnologiesController';

const tecnologiesRouter = Router();
const tecnologiesController = new TecnologiesController();
// tecnologiesRouter.use(ensureAuthenticated);

tecnologiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  tecnologiesController.create,
);

tecnologiesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      tecnology_id: Joi.string().required().uuid(),
      name: Joi.string().required(),
    },
  }),
  tecnologiesController.update,
);

export default tecnologiesRouter;
