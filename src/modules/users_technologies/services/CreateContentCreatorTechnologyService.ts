import { inject, injectable } from 'tsyringe';

import { Technology } from '@prisma/client';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import IUsersTechnologiesRepository from '../repositories/IUsersTechnologiesRepository';

interface IRequest {
  name: string;
  technology_image: string;
  content_creators_ids: [];
}

@injectable()
class CreateContentCreatorTechnologyService {
  constructor(
    @inject('UsersTechnologiesRepository')
    private usersTechnologiesRepository: IUsersTechnologiesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute({
    name,
    technology_image,
    content_creators_ids,
  }: IRequest): Promise<Technology> {
    if (content_creators_ids.length === 0)
      throw new Error('Voce deve selecionar pelo menos um criador de conteúdo');

    const fileName = await this.storageProvider.saveFile(technology_image);

    const technology = await this.technologiesRepository.create({
      name,
      technology_image: fileName,
    });

    await this.usersTechnologiesRepository.createContentCreatorTechnology({
      technology_id: technology.id,
      content_creators_ids,
    });

    return technology;
  }
}

export default CreateContentCreatorTechnologyService;
