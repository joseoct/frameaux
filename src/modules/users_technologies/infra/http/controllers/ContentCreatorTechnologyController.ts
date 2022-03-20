import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContentCreatorTechnologyService from '@modules/users_technologies/services/CreateContentCreatorTechnologyService';
import ListTechnologiesByContentCreatorService from '@modules/users_technologies/services/ListTechnologiesByContentCreatorService';

export default class ContentCreatorTechnologyController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, content_creators_ids } = request.body;

      const technology_image = request.file.filename;

      const createContentCreatorTechnologyService = container.resolve(
        CreateContentCreatorTechnologyService,
      );

      const content_creator_ids_converted = content_creators_ids.replace(
        /'/g,
        '"',
      );

      const contentCreatatorTechnology = await createContentCreatorTechnologyService.execute(
        {
          name,
          technology_image,
          content_creators_ids: JSON.parse(content_creator_ids_converted),
        },
      );

      return response.json(contentCreatatorTechnology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { content_creator_id } = request.query;

      const listTechnologiesByContentCreator = container.resolve(
        ListTechnologiesByContentCreatorService,
      );

      const technologiesByContentCreator = await listTechnologiesByContentCreator.execute(
        {
          content_creator_id,
        },
      );

      return response.json(technologiesByContentCreator);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
