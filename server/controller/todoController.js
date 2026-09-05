const Todo = require('./../models/todoModel')
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
exports.getalltodo = catchAsync(async (req, res, next) => {

    const filter = {};

    // Filtering
    if (req.query.difficulty) {
        filter.difficulty = req.query.difficulty;
    }

    if (req.query.completed !== undefined) {
        filter.completed = req.query.completed === 'true';
    }

    if (req.query.date) {

        filter.date = {};

        const operators = {
            gte: '$gte',
            gt: '$gt',
            lte: '$lte',
            lt: '$lt'
        };

        for (const key in req.query.date) {
            if (operators[key]) {
                filter.date[operators[key]] = req.query.date[key];
            }
        }
    }

    // Sorting
    let sort = '';

    if (req.query.sort) {
        sort = req.query.sort.split(',').join(' ');
    } else {
        sort = '-createdAt';
    }
    let fields = '-__v';
    if (req.query.fields) {
        fields = req.query.fields.split(',').join(' ');
    }



    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 10;
    let skip = (page - 1) * limit;

    const query = Todo.find({
        ...filter,
        user: req.user._id
    })
        .sort(sort)
        .select(fields)
        .skip(skip)
        .limit(limit);


    const todos = await query;

    res.status(200).json({
        status: 'success',
        results: todos.length,
        data: {
            todos
        }
    });
});
exports.createtodo = catchAsync(async (req, res) => {
    const newTodo = await Todo.create({
        ...req.body,
        user: req.user._id
    });
    res.status(201).json({
        status: 'success',
        data: {
            todo: newTodo
        }
    })
}),
    exports.gettodo = catchAsync(async (req, res, next) => {
        const todoone = await Todo.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        if (!todoone) {
            const err = new AppError('Todo not found', 404);
            return next(err)
        }
        res.status(200).json({
            status: 'success',
            data: {
                todo: todoone
            }
        });
    });
exports.updatetodo = catchAsync(async (req, res, next) => {
    const uptodo = await Todo.findOneAndUpdate({
        _id: req.params.id,
        user: req.user._id
    },
        updateData, {
        new: true,
        runValidators: true
    })
    if (!uptodo) {
        const err = new AppError('Todo not found', 404);
        return next(err);
    }

    res.status(200).json({
        status: 'success',
        data: {
            todo: uptodo
        }
    })
}),
    exports.deletetodo = catchAsync(async (req, res, next) => {

        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        if (!todo) {
            const err = new AppError('Todo not found', 404);
            return next(err);
        }

        res.status(204).send();
    });