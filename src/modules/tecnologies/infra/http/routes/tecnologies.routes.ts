import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
// import ensureAuthenticated from '@modules/tecnologies/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import TecnologiesController from '../controllers/TecnologiesController';

const tecnologiesRouter = Router();
const tecnologiesController = new TecnologiesController();
// tecnologiesRouter.use(ensureAuthenticated);

const upload = multer(uploadConfig.multer);

tecnologiesRouter.post(
  '/',
  upload.single('tecnology_image'),
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
