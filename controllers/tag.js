const { body, validationResult } = require('express-validator');
const Tag = require('../models/tag.js');
const Item = require('../models/item.js');

const PASSWORD = 'LOL';
exports.index = (req, res, next) => {
  Tag.find()
    .exec()
    .then((tags) => res.render('tag_index', { tags }))
    .catch((err) => next(err));
};

exports.details = (req, res, next) => {
  const tag = Tag.findById(req.params.id).exec();
  const items = Item.find({ tag: req.params.id }).exec();

  Promise.all([tag, items])
    .then((results) => res.render('tag_details', { tag: results[0], items: results[1] }))
    .catch((err) => next(err));
};

exports.createGET = (req, res) => {
  res.render('tag_form');
};

exports.createPOST = [
  body('name').isLength({ min: 3, max: 500 }).escape(),
  body('description').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.state(422).json({ errors });
    }
    Tag.create({
      name: req.body.name,
      description: req.body.description,
    }).then((tag) => res.redirect(tag.url))
      .then((err) => next(err));
  },
];

exports.editGET = (req, res, next) => {
  Tag.findById(req.params.id)
    .exec()
    .then((tag) => {
      res.render('tag_form', { tag });
    }).catch((err) => next(err));
};

exports.editPOST = [
  body('name').isLength({ min: 3, max: 500 }).escape(),
  body('description').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.state(422).json({ errors });
    }
    Tag.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
    }).exec()
      .then((tag) => res.redirect(tag.url))
      .catch((err) => next(err));
  },
];

exports.deleteGET = (req, res, next) => {
  Tag.findById(req.params.id)
    .exec()
    .then((tag) => res.render('tag_delete', { tag }))
    .catch((err) => next(err));
};

exports.deletePOST = (req, res, next) => {
  if (req.body.password === PASSWORD) {
    Tag.findByIdAndRemove(req.body.id)
      .then(res.redirect('/item/all'))
      .catch((err) => next(err));
  } else {
    res.json({ 'wrong password': true });
  }
};
