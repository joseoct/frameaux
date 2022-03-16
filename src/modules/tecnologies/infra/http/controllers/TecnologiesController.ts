import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTecnologyService from '@modules/tecnologies/services/CreateTecnologyService';
import UpdateTecnologyService from '@modules/tecnologies/services/UpdateTecnologyService';
import ListAllTecnologiesService from '@modules/tecnologies/services/ListAllTecnologiesService';

export default class TecnologiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;

      const tecnology_image = request.file.filename;

      const createTecnology = container.resolve(CreateTecnologyService);

      const tecnology = await createTecnology.execute({
        name,
        tecnology_image,
      });

      return response.json(tecnology);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { tecnology_id, name } = request.body;

      const updateTecnology = container.resolve(UpdateTecnologyService);

      const tecnology = await updateTecnology.execute({ tecnology_id, name });

      return response.json(tecnology);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listTecnologies = container.resolve(ListAllTecnologiesService);

      const tecnologies = await listTecnologies.execute();

      return response.json(tecnologies);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
