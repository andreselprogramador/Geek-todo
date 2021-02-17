const Todo = require('../models/Todo');

const getTodos = async (req, res) => {

    try{
        const todos = await Todo.find();


        return res.json({
            ok: true,
            todos: todos,
        })
    }catch(err){
        console.log(err);

        return res.status(404).json({
            ok: false,
            msg: "No se pudieron obtener los todos de ese usuario"
        })
    }
}

const crearTodo = async (req, res) => {

    const todo = new Todo(req.body);

    try{

        todo.user = req.uid;

        const todoGuardado = await todo.save();

        res.status(201).json({
            ok: true,
            todo: todoGuardado,

        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false, 
            msg: "No se pudo crear el todo"
        });
    }

    return res.status(201).json({
        ok: true,
        msg: "crearTodo",
    })
}

const actualizarTodo = async (req, res) => {

    const todoId = req.params.todoId;
    const uid = req.uid;

    try{

        const todo = await Todo.findById(todoId);

        if(!todo){
            return res.status(404).json({
                ok: false,
                msg: "El todo no existe con ese id"
            })
        }

        if(todo.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "No puede editar este todo"
            })
        }

        const nuevoTodo = {
            ...req.body,
            user: uid
        }

        const todoActualizado = await Todo.findByIdAndUpdate(todoId, nuevoTodo, {new: true});

        return res.status(200).json({
            ok: true,
            todo: todoActualizado,
        })



    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "No se pudo actualizar el todo"
        });
    }
}

const eliminarTodo = async (req, res) => {

    const todoId = req.params.todoId;
    const uid = req.uid;

    try{
        const todo = await Todo.findById(todoId);

        if(!todo){
            return res.status(404).json({
                ok: false,
                msg: "El todo no existe con ese id"
            })
        }

        if(todo.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "No puede eliminar ese todo"
            })
        }

        const todoEliminado = await Todo.findByIdAndDelete(todo);

        res.json({
            ok: true,
            todoEliminado
        })



    }catch (err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "No se pudo eliminar el todo"
        });
    }

    return res.status(200).json({
        ok: true,
        msg: "eliminarTodo",
    })
}

module.exports = {
    getTodos,
    crearTodo, 
    actualizarTodo,
    eliminarTodo
}