import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowTopicService from '@modules/topics/services/ShowTopicService';
import DeleteTopicByTechnologyService from '@modules/topics/services/DeleteTopicByTechnologyService';

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

      const deleteTopicByTechnology = container.resolve(
        DeleteTopicByTechnologyService,
      );

      const deletedTopic = await deleteTopicByTechnology.execute({
        topic_id,
      });

      return response.json(deletedTopic);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
