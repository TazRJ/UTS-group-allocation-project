import mongoose, { Schema } from 'mongoose'

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: [true, 'Group name is required'],
    },
    studentId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Student id is required'],
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Subject id is required']
    },
    groupTopic: {
      type: String,
      required: [true, 'Group topic is required']
    },
    requestLeave: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  },
)

export default groupSchema
