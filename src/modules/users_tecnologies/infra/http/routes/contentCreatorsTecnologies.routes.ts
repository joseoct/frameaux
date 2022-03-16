import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@modules/users/infra/http/middlewares/ensureRole';

import ContentCreatorTecnologyController from '../controllers/ContentCreatorTecnologyController';

const contentCreatorsTecnologiesRouter = Router();
const contentCreatorTecnologyController = new ContentCreatorTecnologyController();

const upload = multer(uploadConfig.multer);

contentCreatorsTecnologiesRouter.use(ensureAuthenticated);

contentCreatorsTecnologiesRouter.use(ensureRole(['administrator']));

contentCreatorsTecnologiesRouter.post(
  '/',
  upload.single('tecnology_image'),
  celebrate({
    [Segments.BODY]: {
      tecnology_name: Joi.string().required(),
      content_creators_ids: Joi.string().required(),
    },
  }),
  contentCreatorTecnologyController.create,
);

export default contentCreatorsTecnologiesRouter;
