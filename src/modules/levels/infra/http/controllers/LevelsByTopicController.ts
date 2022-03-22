import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateLevelService from '@modules/levels/services/CreateLevelService';
import FindAllLevelsByTopicService from '@modules/levels/services/FindAllLevelsByTopicService';

export default class LevelsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { topic_id } = request.params;

      const createLevel = container.resolve(CreateLevelService);

      const level = await createLevel.execute({
        topic_id,
      });

      return response.json(level);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { topic_id } = request.params;

      const createLevel = container.resolve(FindAllLevelsByTopicService);

      const levelsByTopic = await createLevel.execute({
        topic_id,
      });

      return response.json(levelsByTopic);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
