const mongoose = require('mongoose')

const EnrolmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

EnrolmentSchema.post('find', function (result) {
  console.log(this instanceof mongoose.Query) // true
  // prints returned documents
  console.log('find() returned ' + JSON.stringify(result))
  // prints number of milliseconds the query took
  console.log('find() took ' + (Date.now() - this.start) + ' millis')
})
module.exports = mongoose.model('Enrolment', EnrolmentSchema)
