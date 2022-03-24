import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContentCreatorTechnologyService from '@modules/users_technologies/services/CreateContentCreatorTechnologyService';
import UpdateContentCreatorTechnologyService from '@modules/users_technologies/services/UpdateContentCreatorTechnologyService copy';

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

      const contentCreatorTechnology = await createContentCreatorTechnologyService.execute(
        {
          name,
          technology_image,
          content_creators_ids: JSON.parse(content_creator_ids_converted),
        },
      );

      return response.json(contentCreatorTechnology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { name, content_creators_ids } = request.body;
      const { technology_id } = request.params;

      const updateContentCreatorTechnologyService = container.resolve(
        UpdateContentCreatorTechnologyService,
      );

      const content_creator_ids_converted = content_creators_ids.replace(
        /'/g,
        '"',
      );

      await updateContentCreatorTechnologyService.execute({
        technology_id,
        name,
        content_creators_ids: JSON.parse(content_creator_ids_converted),
      });

      return response.json();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
