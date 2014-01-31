/**
 * Post
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  schema: true,

  attributes: {

    title: {
      type: 'string',
      required: true
    },

    body: {
      type: 'string'
    },

    authorId: {
      type: 'string',
      required: true
    },

    online: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
