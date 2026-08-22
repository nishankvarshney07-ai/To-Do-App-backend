const express = require('express');
const router = express.Router();

const todoController = require('./../controller/todoController');


router
    .route('/')
    .get(todoController.getalltodo)
    .post(todoController.createtodo);

router
    .route('/:id')
    .get(todoController.gettodo)
    .patch(todoController.updatetodo)
    .delete(todoController.deletetodo);


module.exports = router;