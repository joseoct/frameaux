import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTopicService from '@modules/topics/services/CreateTopicService';
import ListTopicsByTechnologyService from '@modules/topics/services/ListTopicsByTechnologyService';

export default class TopicsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, explanation, layer } = request.body;
      const { technology_id } = request.params;

      const createTopic = container.resolve(CreateTopicService);

      const topic = await createTopic.execute({
        name,
        explanation,
        layer,
        technology_id,
      });

      return response.json(topic);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { technology_id } = request.params;

      const listTopicsByTechnology = container.resolve(
        ListTopicsByTechnologyService,
      );

      const layerTopics = await listTopicsByTechnology.execute({
        technology_id,
      });

      return response.json(layerTopics);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
