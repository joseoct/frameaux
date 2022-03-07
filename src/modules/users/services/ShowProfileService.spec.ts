import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Zezinho',
      email: 'jose@hotmail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Zezinho');
    expect(profile.email).toBe('jose@hotmail.com');
  });

  it('should not be able show a not existing profile', async () => {
    await expect(
      showProfileService.execute({
        user_id: '-non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
