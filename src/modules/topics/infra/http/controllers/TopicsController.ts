import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTopicService from '@modules/topics/services/CreateTopicService';

export default class TopicsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, explanation, layer } = request.body;
      const { id: tecnology_id } = request.params;

      const createTopic = container.resolve(CreateTopicService);

      const topic = await createTopic.execute({
        name,
        explanation,
        layer,
        tecnology_id,
      });

      return response.json(topic);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
