import { getRepository, Repository } from 'typeorm';
import ITecnologiesRepository from '@modules/tecnologies/repositories/ITecnologiesRepository';
import ICreateTecnologyDTO from '@modules/tecnologies/dtos/ICreateTecnologyDTO';
import Tecnology from '../entities/Tecnology';

class TecnologiesRepository implements ITecnologiesRepository {
  private ormRepository: Repository<Tecnology>;

  constructor() {
    this.ormRepository = getRepository(Tecnology);
  }

  /*
  public async findTecnologyByName(name: string): Promise<Tecnology | undefined> {
    const tecnology = await this.ormRepository.findOne({
      where: { name },
    });

    return tecnology;
  }
  */

  public async create(tecnologyData: ICreateTecnologyDTO): Promise<Tecnology> {
    const tecnology = this.ormRepository.create(tecnologyData);

    await this.ormRepository.save(tecnology);

    return tecnology;
  }

  public async save(tecnology: Tecnology): Promise<Tecnology> {
    return this.ormRepository.save(tecnology);
  }
}

export default TecnologiesRepository;
