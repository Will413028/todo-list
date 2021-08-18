// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todos = require('../../models/todo')



router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const name = req.body.name

    return Todos.create({ name })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    return Todos.findById(id)
        .lean()
        .then((todo) => res.render('detail', { todo }))
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Todos.findById(id)
        .lean()
        .then((todo) => res.render('edit', { todo }))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const {name, isDone} = req.body

    return Todos.findById(id)
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            // if (isDone === 'on') {
            //     todo.isDone = true
            // } else {
            //     todo.isDone = false
            // }
            return todo.save()
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Todos.findById(id)
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})



module.exports = router