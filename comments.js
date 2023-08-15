// Create web server

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var comments = [
    { name: 'John', comment: 'Hello World!' },
    { name: 'Jack', comment: 'Hello World!' },
    { name: 'Joe', comment: 'Hello World!' },
    { name: 'Jim', comment: 'Hello World!' },
    { name: 'Jane', comment: 'Hello World!' }
];

router.route('/comments')
    .get(function(req, res) {
        res.json(comments);
    })
    .post(bodyParser.urlencoded({ extended: true }), function(req, res) {
        comments.push(req.body);
        res.json(comments);
    });

router.route('/comments/:id')
    .delete(function(req, res) {
        comments.splice(req.params.id, 1);
        res.json(comments);
    });

module.exports = router;