const Course = require('../models/Course')

class CourseController {
  async index (req, res) {
    const filters = {}

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }
    if (req.query.description) {
      filters.description = new RegExp(req.query.description, 'i')
    }

    const courses = await Course.find(filters)

    return res.json(courses)
  }

  async show (req, res) {
    const course = await Course.findById(req.params.id)

    return res.json(course)
  }

  async store (req, res) {
    const { title } = req.body

    if (await Course.findOne({ title })) {
      return res.status(400).json({ error: 'Este curso já foi cadastrado!' })
    }
    const course = await Course.create(req.body)

    return res.json(course)
  }

  async update (req, res) {
    const { title } = req.body
    if (!title) {
      return res.status(400).json({ error: 'Esqueceu de preencher algo?' })
    }
    if (await Course.findOne({ title })) {
      return res.status(400).json({ error: 'Este curso já foi cadastrado!' })
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(course)
  }

  async destroy (req, res) {
    await Course.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new CourseController()
