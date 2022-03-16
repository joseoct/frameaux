import { Request, Response } from 'express';
import { container } from 'tsyringe';
import InitialDataDashboardService from '@modules/dashboard/services/InitialDataDashboardService';

export default class DashboardsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const createDashboard = container.resolve(InitialDataDashboardService);

      const dashboard = await createDashboard.execute();

      return response.json(dashboard);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
