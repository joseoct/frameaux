import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new session', async () => {
    const user = await fakeUserRepository.create({
      name: 'zezinho',
      email: 'jose@hotmail.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'jose@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      createSession.execute({
        email: 'jose@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong', async () => {
    await fakeUserRepository.create({
      name: 'zezinho',
      email: 'jose@hotmail.com',
      password: '123456',
    });

    await expect(
      createSession.execute({
        email: 'jose@hotmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
