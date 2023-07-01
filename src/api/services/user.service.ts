import { AppDataSource } from '../../database/data-source';

import { User } from '../../database/entities/User';

export async function register(user: User) {
  try {
    const userData = user;

    const userRepository = AppDataSource.getRepository(User);
    const userObj = userRepository.create(userData);

    return await userRepository.save(userObj);

  } catch (error) {
    throw error;
  }
}

export async function login(user: User) {
  try {
    const UserData = user;

    const userRepository = AppDataSource.getRepository(User);

    return  await userRepository.findOneBy({ email: UserData.email });
  } catch (error) {
    throw error;
  }
}