import { AuthenticationError, UserInputError } from 'apollo-server-express';

import { Post } from '../models';
import { commentSchema } from '../schemas';
import checkAuth from '../utils/checkAuth';

export default {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      // Validate User
      const { userName } = checkAuth(context);

      // Validate Input Comment
      try {
        await commentSchema.validateAsync(
          {
            body,
          },
          { abortEarly: false }
        );
      } catch (err) {
        throw new UserInputError('Comment Body is Empty');
      }

      // Find Post and Save Comment
      try {
        const post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            userName,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        }
        throw new UserInputError('Comment Not Found');
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      // Validate User
      const { userName } = checkAuth(context);

      // Find Post and Delete Comment
      try {
        const post = await Post.findById(postId);
        if (post) {
          const idx = post.comments.findIndex(item => item.id === commentId);
          if (post.comments[idx].userName === userName) {
            post.comments.splice(idx, 1);
            await post.save();
            return post;
          }
          throw new AuthenticationError('Action Not Alowed');
        }
        throw new UserInputError('Comment Not Found');
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
