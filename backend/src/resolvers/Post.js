import { AuthenticationError, UserInputError } from 'apollo-server-express';

import { Post } from '../models';
import { postSchema } from '../schemas';
import checkAuth from '../utils/checkAuth';

/*
import {  existsSync, mkdirSync } from 'fs';
import path from 'path';
existsSync(path.join(__dirname, '../images')) ||
  mkdirSync(path.join(__dirname, '../images'));
*/

export default {
  // Modifiers
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentsCount(parent) {
      return parent.comments.length;
    },
  },
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error('Find Post Error');
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post Not Found');
        return post;
      } catch (err) {
        throw new Error('Find Post Error');
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      try {
        await postSchema.validateAsync(
          {
            body,
          },
          { abortEarly: false }
        );
      } catch (err) {
        throw new UserInputError('Post Body is Empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });

      try {
        const post = await newPost.save();
        context.pubsub.publish('NEW_POST', { newPost: post });
        return post;
      } catch (err) {
        throw new Error('Save Data Error');
      }
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.userName === post.userName) {
          await post.delete();
          return 'Post Deleted successfuly';
        }
        throw new AuthenticationError('Action not Allowed');
      } catch (err) {
        throw new Error(err);
      }
    },
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
        throw new Error('Like Post Error');
      }
    },
  },
};
