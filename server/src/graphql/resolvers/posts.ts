import { PostModel } from '../../models/Post';

export const PostsResolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await PostModel.find();
                return posts;
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}