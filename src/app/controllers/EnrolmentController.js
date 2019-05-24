const Enrolment = require('../models/Enrolment')
const Student = require('../models/Student')
const Course = require('../models/Course')

class EnrolmentController {
  async index (req, res) {
    const enrolments = await Enrolment.find()
      .populate('course')
      .populate('student')

    return res.json(enrolments)
  }

  async show (req, res) {
    const enrolment = await Enrolment.findById(req.params.id)

    return res.json(enrolment)
  }

  async store (req, res) {
    const { course, student } = req.body
    if (!course || !student) {
      return res.status(400).json({ error: 'Esqueceu de preencher algo?' })
    }
    if (!(await Student.findById(student))) {
      return res.status(400).json({ error: 'Este aluno não existe' })
    }
    if (!(await Course.findById(course))) {
      return res.status(400).json({ error: 'Este curso não existe' })
    }

    const enrolmentConflit = await Enrolment.find({ course, student })

    if (enrolmentConflit.length > 0) {
      return res
        .status(400)
        .json({ error: 'Este aluno já está matriculado neste curso' })
    }

    const enrolment = await Enrolment.create(req.body)
    const enrolmentPopulate = await Enrolment.findById(enrolment._id)
      .populate('course')
      .populate('student')
    return res.json(enrolmentPopulate)
  }

  async update (req, res) {
    const { course, student } = req.body

    if (!(await Student.findById(student))) {
      return res.status(400).json({ error: 'Este aluno não existe' })
    }

    if (!(await Course.findById(course))) {
      return res.status(400).json({ error: 'Este curso não existe' })
    }

    if (!course || !student) {
      return res.status(400).json({ error: 'Esqueceu de preencher algo?' })
    }
    const enrolmentConflit = await Enrolment.find({ course, student })

    if (enrolmentConflit.length > 0) {
      return res
        .status(400)
        .json({ error: 'Este aluno já está matriculado neste curso' })
    }
    const enrolment = await Enrolment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    )
    const enrolmentPopulate = await Enrolment.findById(enrolment._id)
      .populate('course')
      .populate('student')

    return res.json(enrolmentPopulate)
  }

  async destroy (req, res) {
    await Enrolment.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new EnrolmentController()
