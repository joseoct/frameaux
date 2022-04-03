import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowLevelService from '@modules/levels/services/ShowLevelService';

export default class LevelsController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { level_id } = request.params;

      const showLevelService = container.resolve(ShowLevelService);

      const levelsByTopic = await showLevelService.execute({
        level_id,
      });

      return response.json(levelsByTopic);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
