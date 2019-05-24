const Student = require('../models/Student')

class StudentController {
  async index (req, res) {
    const filters = {}

    if (req.query.name) {
      filters.name = new RegExp(req.query.name, 'i')
    }
    if (req.query.email) {
      filters.email = new RegExp(req.query.email, 'i')
    }

    const students = await Student.find(filters)

    return res.json(students)
  }

  async show (req, res) {
    const student = await Student.findById(req.params.id)

    return res.json(student)
  }

  async store (req, res) {
    const { email, name } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Esqueceu de preencher algo?' })
    }

    if (await Student.findOne({ email })) {
      return res.status(400).json({ error: 'Este e-mail já foi cadastrado!' })
    }

    const student = await Student.create(req.body)

    return res.json(student)
  }

  async update (req, res) {
    const { email, name } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Esqueceu de preencher algo?' })
    }

    if (await Student.findOne({ email })) {
      return res.status(400).json({ error: 'Este e-mail já foi cadastrado!' })
    }
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(student)
  }

  async destroy (req, res) {
    await Student.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new StudentController()
