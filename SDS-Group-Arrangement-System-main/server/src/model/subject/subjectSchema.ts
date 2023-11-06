import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
    },
    number: {
      type: String,
      required: [true, 'Subject number is required'],
    },
  },
  {
    timestamps: true,
  },
)

export default subjectSchema
