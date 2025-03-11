const { where } = require("sequelize");
const {User, Post} = require("../models");

// create new post
module.exports.create_post = async (req, res) => {
    const {userUuid, title, message} = req.body;
    try{
        const user = await User.findOne({where: {uuid: userUuid}}) // returns user data find by uuid

        const post = await Post.create({title, message, userId: user.id}); // when creating post, it uses the id from the user 

        return res.status(200).json(post);

    } catch(err) {  
        console.log(err);
        return res.status(400).json(err);
    }
}

// get all posts
module.exports.get_post = async (req, res) => {
    try{
        const posts = await Post.findAll();
        return res.status(200).json(posts);
    } catch(err) {
        return res.status(500).json(err);
    }
}

// update post by uuid
module.exports.update_post = async (req, res) => {
    const {title, message} = req.body;
    const uuid = req.params.uuid;
    
    try{
        const post = await Post.findOne({where: {uuid}});
        post.title = title;
        post.message = message;

        await post.save(); // save to update to current output

        return res.status(200).json(post);
    } catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// find post by id
module.exports.find_post_byid = async (req, res) => {
    try{
        const uuid = req.params.uuid;
        const post = await Post.findOne({
            where: {uuid},
            include: 'users'
        });

        return res.status(200).json(post);

    } catch(err) {
        return res.status(500).json(err);
    }
}

// delete post
module.exports.delete_post = async (req, res) => {
    const uuid = req.params.uuid;
    try{
        const post = await Post.findOne({where: {uuid}});
        await post.destroy();

        return res.status(200).json({message: 'user deleted!'});
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}