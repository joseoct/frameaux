import { inject, injectable } from 'tsyringe';

import { Tecnology } from '@prisma/client';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITecnologiesRepository from '@modules/tecnologies/repositories/ITecnologiesRepository';
import IUsersTecnologiesRepository from '../repositories/IUsersTecnologiesRepository';

interface IRequest {
  tecnology_name: string;
  tecnology_image: string;
  content_creators_ids: [];
}

@injectable()
class CreateContentCreatorTecnologyService {
  constructor(
    @inject('UsersTecnologiesRepository')
    private usersTecnologiesRepository: IUsersTecnologiesRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('TecnologiesRepository')
    private tecnologiesRepository: ITecnologiesRepository,
  ) {}

  public async execute({
    tecnology_name,
    tecnology_image,
    content_creators_ids,
  }: IRequest): Promise<Tecnology> {
    const contentCreatorRole = await this.rolesRepository.findByName(
      'content_creator',
    );
    if (content_creators_ids.length === 0)
      throw new Error('Voce deve selecionar pelo menos um criador de conteúdo');

    const fileName = await this.storageProvider.saveFile(tecnology_image);

    const tecnology = await this.tecnologiesRepository.create({
      name: tecnology_name,
      tecnology_image: fileName,
    });

    await this.usersTecnologiesRepository.createContentCreatorTecnology({
      tecnology_id: tecnology.id,
      content_creators_ids,
      role_id: contentCreatorRole.id,
    });

    return tecnology;
  }
}

export default CreateContentCreatorTecnologyService;
