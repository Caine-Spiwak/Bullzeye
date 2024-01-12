import mongoose from "mongoose"

const projectSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a name value']
  },
  isActive: {type: Boolean, default: true},
  tasks: [{
      name: String,
      description: String,
      order: Number,
      todos: [{
        description: String,
        order: Number
      }]
    }],
}, {
  timestamps: true,
})

const Project = mongoose.model('Project', projectSchema)

export default Project

