const express = require('express')

const routes = express.Router()

const controllers = require('./app/controllers')

routes.get('/', (req, res) => {
  return res.send('Hello World')
})
/**
 * Courses
 */
routes.get('/courses', controllers.CourseController.index)
routes.get('/courses/:id', controllers.CourseController.show)
routes.post('/courses', controllers.CourseController.store)
routes.put('/courses/:id', controllers.CourseController.update)
routes.delete('/courses/:id', controllers.CourseController.destroy)
/**
 * Students
 */
routes.get('/students', controllers.StudentController.index)
routes.get('/students/:id', controllers.StudentController.show)
routes.post('/students', controllers.StudentController.store)
routes.put('/students/:id', controllers.StudentController.update)
routes.delete('/students/:id', controllers.StudentController.destroy)
/**
 * Courses
 */
routes.get('/enrolments', controllers.EnrolmentController.index)
routes.get('/enrolments/:id', controllers.EnrolmentController.show)
routes.post('/enrolments', controllers.EnrolmentController.store)
routes.put('/enrolments/:id', controllers.EnrolmentController.update)
routes.delete('/enrolments/:id', controllers.EnrolmentController.destroy)

module.exports = routes
