import mongoose, { Schema } from 'mongoose'

const selectionSchema = new mongoose.Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'user'
    },
    subject: {
      type: Schema.Types.ObjectId,
      required: [true, 'Subject id is required'],
      ref: 'subject'
    },
    selection:{
      type: Object,
      required: [true, 'Selection is required'],
    },
    approved: {
      type: Boolean,
      required: [true, 'Approval status is required'],
    }
  },
  {
    timestamps: true,
  },
)

export default selectionSchema
