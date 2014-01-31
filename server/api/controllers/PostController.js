/**
 * PostController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {

  create: function (req, res, next) {

    var postObj = {
      title: req.param('title'),
      body: req.param('body'),
      authorId: req.param('authorId'),
      online: req.param('online')
    }

    Post.create(postObj, function postCreated(err, post) {

      if (err) {
        return res.badRequest(err);
      }
      post.save(function (err, post) {
        if (err) {
          return next(err);
        }
        res.json(post);
      });
    });
  },

  show: function (req, res, next) {
    Post.findOne(req.param('id'), function foundPost(err, post) {
      if (err) {
        return next(err);
      }
      if (!post) {
        return next();
      }
      res.json(post)
    });
  },

  showAll: function (req, res, next) {

    Post.find(function foundPosts(err, posts) {
      if (err) {
        return next(err);
      }
      // pass the array down to the /views/index.ejs page
      res.json(posts);
    });
  },

  update: function (req, res, next) {
    var postObj = null;
    if (req.user.admin) {
      postObj = {
        title: req.param('title'),
        body: req.param('body'),
        authorId: req.param('authorId'),
        online: req.param('online')
      }
    }
    else {
      postObj = {
        title: req.param('title'),
        body: req.param('body'),
        online: req.param('online')
      }
    }

    Post.update(req.param('id'), postObj, function postUpdated(err) {
      if (err) {
        return res.json(err);
      }
      res.json('success');
    });
  },

  destroy: function (req, res, next) {

    Post.findOne(req.param('id'), function foundPost(err, post) {
      if (err) {
        return next(err);
      }
      if (!post) {
        return next('post doesn\'t exist.');
      }
      Post.destroy(req.param('id'), function postDestroyed(err) {
        if (err) {
          return next(err);
        }
        res.json('successfully destroyed');
      });

    });
  },

};