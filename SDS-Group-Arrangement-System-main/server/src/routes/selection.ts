import express from 'express'
import Selection from '../model/selection.ts/selectionModel'
import User from '../model/user/userModel'
import Subject from '../model/subject/subjectModel'

const app = express()

// const validateUserAndSubject = async (req: any, res: any, next: any) => {
//   try {
//        const { number, id } = req.params

//        console.log('numbering', number, id)
// //    next()
//   } catch (error) {
//     next(error)
//   }
// }
// /**
//  * Use the validateVPNAccess middleware
//  */
// app.use('/:number/:id', validateUserAndSubject)

app.get('/:number/:id', async (req, res) => {
  try {
    const { number, id } = req.params
    const user = await User.findOne({ UTS_ID: id })
    if (!user) return res.status(409).send({ message: 'User does not exist!' })

    const subject = await Subject.findOne({ number: number.toString() })
    if (!subject)
      return res.status(409).send({ message: 'Subject does not exist!' })

    const selection = await Selection.findOne({
      student: user._id,
      subject: subject._id,
    })

    const response = selection ? selection : {}

    res.status(200).send(response)
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

app.post('/:number/:id', async (req, res) => {
  try {
    const { number, id } = req.params

    const user = await User.findOne({ UTS_ID: id })
    if (!user) return res.status(409).send({ message: 'User does not exist!' })

    const subject = await Subject.findOne({ number })
    if (!subject)
      return res.status(409).send({ message: 'Subject does not exist!' })

    const data = {
      student: user._id,
      subject: subject._id,
      selection: req.body,
      approved: false,
    }

    const selection = await Selection.create(data)

    res.status(200).json(selection)
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

export default app
