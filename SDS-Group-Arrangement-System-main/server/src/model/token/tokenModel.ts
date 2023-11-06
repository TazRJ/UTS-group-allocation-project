import mongoose from 'mongoose'
import tokenSchema from './tokenSchema'

const Token = mongoose.model('Token', tokenSchema)

export default Token
