import { Tecnology } from '@prisma/client';
import ICreateTecnologyDTO from '../dtos/ICreateTecnologyDTO';

export default interface ITecnologiesRepository {
  create(data: ICreateTecnologyDTO): Promise<Tecnology>;
  update(data: Tecnology): Promise<Tecnology>;
  findById(id: string): Promise<Tecnology>;
  findAllTecnologies(): Promise<Tecnology[]>;
  findByName(name: string): Promise<Tecnology>;
  findTotalNumberTecnologies(): Promise<number>;
}
