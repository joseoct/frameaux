import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TechnologiesByUserController from '../controllers/TechnologiesByUserController';

const technologiesByUserRouter = Router();
const technologiesByUserController = new TechnologiesByUserController();

technologiesByUserRouter.use(ensureAuthenticated);

technologiesByUserRouter.get('/', technologiesByUserController.index);

export default technologiesByUserRouter;
