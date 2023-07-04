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

export async function viewAll(user: string) {
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const postObj = await postRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: user,
        },
      },
    });

    return postObj;
  } catch (error) {
    throw error;
  }
}

export async function viewOne(postID: number, user: string) {
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const postObj = await postRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: postID,
        user: {
          id: user,
        },
      },
    });
    return postObj;
  } catch (error) {
    throw error;
  }
}

export async function update(postID: number, post: Post, userId: string) {
  try {
    const postData = post;
    
    const postRepository = AppDataSource.getRepository(Post);
    const postObj = await postRepository.findOneOrFail({
      relations: {
        user: true,
      },
      where: {
        id: postID,
        user: {
          id: userId,
        },
      },
    });

    postRepository.merge(postObj, postData);

    return await postRepository.save(postObj);
  } catch (error) {
    throw error;
  }
}

export async function deleteOne(postID: number, userId: string) {
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const postObj = await postRepository.findOneOrFail({
      relations: {
        user: true,
      },
      where: {
        id: postID,
        user: {
          id: userId,
        },
      },
    });

    return await postRepository.remove(postObj);

  } catch (error) {
    throw error;
  }
} 