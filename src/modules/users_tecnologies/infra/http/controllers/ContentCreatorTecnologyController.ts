import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContentCreatorTecnologyService from '@modules/users_tecnologies/services/CreateContentCreatorTecnologyService';

export default class ContentCreatorTecnologyController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, content_creators_ids } = request.body;

      const tecnology_image = request.file.filename;

      const createContentCreatorTecnologyService = container.resolve(
        CreateContentCreatorTecnologyService,
      );

      const content_creator_ids_converted = content_creators_ids.replace(
        /'/g,
        '"',
      );

      const contentCreatatorTecnology = await createContentCreatorTecnologyService.execute(
        {
          name,
          tecnology_image,
          content_creators_ids: JSON.parse(content_creator_ids_converted),
        },
      );

      return response.json(contentCreatatorTecnology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
