import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DashboardsController from '../controllers/DashboardsController';

const dashboardsRouter = Router();
const dashboardsController = new DashboardsController();

dashboardsRouter.use(ensureAuthenticated);

dashboardsRouter.get('/', dashboardsController.index);

export default dashboardsRouter;
