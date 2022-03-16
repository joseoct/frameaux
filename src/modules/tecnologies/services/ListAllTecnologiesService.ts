import { injectable, inject } from 'tsyringe';
import { Tecnology } from '@prisma/client';
import ITecnologiesRepository from '../repositories/ITecnologiesRepository';

@injectable()
class CreateTecnologyService {
  constructor(
    @inject('TecnologiesRepository')
    private tecnologiesRepository: ITecnologiesRepository,
  ) {}

  public async execute(): Promise<Tecnology[]> {
    const tecnologies = await this.tecnologiesRepository.findAllTecnologies();

    const tecnologiesWithImageUrl = tecnologies.map(tecnology => {
      return {
        ...tecnology,
        tecnology_image: `${process.env.APP_URL}/files/${tecnology.tecnology_image}`,
      };
    });

    return tecnologiesWithImageUrl;
  }
}

export default CreateTecnologyService;
