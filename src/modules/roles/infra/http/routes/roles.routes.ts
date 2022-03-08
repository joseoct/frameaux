import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RolesController from '../controllers/RolesController';

const rolesRouter = Router();
const rolesController = new RolesController();

// SoC: Separation of Concerns (Separação de Preocupações).
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta.

rolesRouter.use(ensureAuthenticated);

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  rolesController.create,
);

export default rolesRouter;
