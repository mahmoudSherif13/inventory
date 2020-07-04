const { body, validationResult } = require('express-validator');
const Item = require('../models/item');
const Tag = require('../models/tag');

exports.index = (req, res, next) => {
  Item.find()
    .populate('tag')
    .exec()
    .then((items) => res.render('item_index', { items }))
    .catch((err) => next(err));
};

exports.details = (req, res, next) => {
  Item.findById(req.params.id)
    .populate('tag')
    .exec()
    .then((item) => res.render('item_details', { item }))
    .catch((err) => next(err));
};

exports.createGET = (req, res, next) => {
  Tag.find()
    .exec()
    .then((tags) => res.render('item_form', { tags }))
    .catch((err) => next(err));
};

exports.createPOST = [
  body('name').isLength({ min: 3, max: 500 }).escape(),
  body('description').escape(),
  body('category').escape(),
  body('price').isDecimal().escape(),
  body('inStock').isDecimal().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.state(422).json({ errors });
    }
    Item.create({
      name: req.body.name,
      description: req.body.description,
      tag: req.body.tag,
      price: req.body.price,
      inStock: req.body.inStock,
    })
      .then((item) => res.redirect(item.url))
      .catch((err) => next(err));
  },
];

exports.editGET = (req, res, next) => {
  const item = Item.findById(req.params.id)
    .populate('tag')
    .exec();
  const tags = Tag.find().exec();

  Promise.all([item, tags])
    .then((results) => res.render('item_form', { item: results[0], tags: results[1] }))
    .catch((err) => next(err));
};

exports.editPOST = [
  body('name').isLength({ min: 3, max: 500 }).escape(),
  body('description').escape(),
  body('category').escape(),
  body('price').isDecimal().escape(),
  body('inStock').isDecimal().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.state(422).json({ errors });
    }
    Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      tag: req.body.tag,
      price: req.body.price,
      inStock: req.body.inStock,
    }).exec()
      .then((item) => res.redirect(item.url))
      .catch((err) => next(err));
  },
];

exports.deleteGET = (req, res, next) => {
  Item.findById(req.params.id)
    .then((item) => res.render('item_delete', { item }))
    .catch((err) => next(err));
};

exports.deletePOST = (req, res, next) => {
  Item.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/item/all'))
    .catch((err) => next(err));
};
