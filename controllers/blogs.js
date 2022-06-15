const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((blogs) => {
            res.render('index',
                { title: 'All blogs', blogs})
        })
        .catch(error => console.log(error))
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(() => {
            res.redirect('/blogs');
        })
        .catch(err => console.log(err))
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create blog' })
}

const blog_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({
                redirect: 'blogs'
            });
        })
        .catch(err => console.log(err))
}

const blog_details = (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => {
            res.render('details', { blog, title: blog.title });
        })
        .catch(err => console.log(err));
}

module.exports = {
    blog_index,
    blog_create_post,
    blog_create_get,
    blog_delete,
    blog_details
}