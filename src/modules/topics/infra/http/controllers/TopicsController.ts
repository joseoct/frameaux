import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowTopicService from '@modules/topics/services/ShowTopicService';
import DeleteTopicService from '@modules/topics/services/DeleteTopicService';
import UpdateTopicService from '@modules/topics/services/UpdateTopicService';

export default class TopicsController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { topic_id } = request.params;

      const showTopicService = container.resolve(ShowTopicService);

      const layerTopics = await showTopicService.execute({
        topic_id,
      });

      return response.json(layerTopics);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { topic_id } = request.params;

      const deleteTopicService = container.resolve(DeleteTopicService);

      const deletedTopic = await deleteTopicService.execute({
        topic_id,
      });

      return response.json(deletedTopic);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { topic_id } = request.params;
      const { name, layer, explanation } = request.body;

      const updateTopicService = container.resolve(UpdateTopicService);

      const deletedTopic = await updateTopicService.execute({
        topic_id,
        name,
        layer,
        explanation,
      });

      return response.json(deletedTopic);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
