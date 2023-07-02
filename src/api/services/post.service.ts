import { AppDataSource } from '../../database/data-source';
import { Post } from '../../database/entities/Post';

export async function create(post: Post) {
  try {
    const postData = post;

    const postRepository = AppDataSource.getRepository(Post);
    const postObj = postRepository.create(postData);

    return await postRepository.save(postObj);

  } catch (error) {
    throw error;
  }
}