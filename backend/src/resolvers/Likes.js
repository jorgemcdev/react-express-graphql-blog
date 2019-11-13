import { UserInputError } from 'apollo-server-express';
import { Post } from '../models';

import checkAuth from '../utils/checkAuth';

export default {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { userName } = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          const isLike = post.likes.find(like => like.userName === userName);
          if (isLike) {
            // Unlike Post
            post.likes = post.likes.filter(like => like.userName !== userName);
            await post.save();
          } else {
            // Like Post
            post.likes.push({
              userName,
              createdAt: new Date().toISOString(),
            });
          }
          await post.save();
          return post;
        }
        throw new UserInputError('Post Not Found');
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
