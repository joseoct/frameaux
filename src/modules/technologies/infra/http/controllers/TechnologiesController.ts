import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTechnologyService from '@modules/technologies/services/CreateTechnologyService';
import UpdateTechnologyService from '@modules/technologies/services/UpdateTechnologyService';
import ListAllTechnologiesService from '@modules/technologies/services/ListAllTechnologiesService';
import ShowTechnologyService from '@modules/technologies/services/ShowTechnologyService';

export default class TechnologiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;

      const technology_image = request.file.filename;

      const createTechnology = container.resolve(CreateTechnologyService);

      const technology = await createTechnology.execute({
        name,
        technology_image,
      });

      return response.json(technology);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { technology_id, name } = request.body;

      const updateTechnology = container.resolve(UpdateTechnologyService);

      const technology = await updateTechnology.execute({
        technology_id,
        name,
      });

      return response.json(technology);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listTechnologies = container.resolve(ListAllTechnologiesService);

      const technologies = await listTechnologies.execute();

      return response.json(technologies);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id: technology_id } = request.params;

      const showTechnology = container.resolve(ShowTechnologyService);

      const technology = await showTechnology.execute({ technology_id });

      return response.json(technology);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
