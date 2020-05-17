const { PostModel } = require('../../models/Post');

export const PostQuery =
{
    async getPosts() {
        try {
            const posts = await PostModel.find();
            return posts;
        } catch (err) {
            throw new Error(err)
        }
    }
}

