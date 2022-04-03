import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateStudentTopicService from '@modules/users_topics/services/CreateStudentTopicService';
import ShowStudentTopicService from '@modules/users_topics/services/ShowStudentTopicService';

export default class StudentTopicController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { topic_id } = request.params;
      const student_id = request.user.id;

      const showStudentTopicService = container.resolve(
        ShowStudentTopicService,
      );

      const users_topic = await showStudentTopicService.execute({
        student_id,
        topic_id,
      });

      return response.json(users_topic);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { topic_id } = request.params;
      const student_id = request.user.id;

      const createStudentTopicService = container.resolve(
        CreateStudentTopicService,
      );

      const users_topic = await createStudentTopicService.execute({
        student_id,
        topic_id,
      });

      return response.json(users_topic);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
