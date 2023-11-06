import express from 'express'
import Subject from '../model/subject/subjectModel'

const app = express()

app.get('/all', async (req, res) => {
  try {
    const subjects = await Subject.find()
    res.status(200).json(subjects)
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

app.get('/:number',async (req, res) => {
  try {
    const {number} = req.params
    const subject = await Subject.findOne({number})
    res.status(200).json(subject)
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

app.post('/new', async (req, res) => {
  try {
    const { name, subjectNumber } = req.body

    const validSubjectNumber = /^\d{5}$/.test(subjectNumber)

    if (!validSubjectNumber) {
      return res
        .status(400)
        .json({ message: 'Subject number must be a five-digit number' })
    }

    const data = {
      name,
      number: subjectNumber,
    }

    const subject = await Subject.create(data)
    res.status(200).json(subject)
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

export default app
