import express from 'express'
import Group from '../model/group/groupModel'
import User from '../model/user/userModel'
import Subject from '../model/subject/subjectModel'
import createRandomGroup from '../utils/createRandomGroup'
import Selection from '../model/selection.ts/selectionModel'
import createBySimilarity from '../utils/createBySimilarity'
import getRandomResearchTopic from '../utils/researchTopics'


const app = express()

app.post('/random', async (req, res) => {
  try {
    const { subjectNumber, groupSize } = req.body

    const subjectObj = await Subject.findOne({ number: subjectNumber })

    if (!subjectObj) {
      throw new Error('Subject does not exist')
    }

    if (!groupSize) {
      throw new Error('Group size required')
    }

    await Group.deleteMany({ subjectId: subjectObj._id })

    const students = await User.find({ role: 'S' }).select(
      '_id name role email UTS_ID',
    )
    const groups = createRandomGroup(students, groupSize)

    let counter = 1

    for (const group of groups) {
      const gName = `G-${counter}`
      const topic = getRandomResearchTopic()

      for (const member of group) {
        await Group.create({
          groupName: gName,
          subjectId: subjectObj._id,
          studentId: member._id,
          groupTopic: topic,
        })
      }
      counter++
    }

    res.status(200).json({ message: 'done' })
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

app.post('/preference', async (req, res) => {
  try {
    const { subjectNumber, groupSize } = req.body

    const subjectObj = await Subject.findOne({ number: subjectNumber })

    if (!subjectObj) {
      throw new Error('Subject does not exist')
    }

    if (!groupSize) {
      throw new Error('Group size required')
    }

    await Group.deleteMany({ subjectId: subjectObj._id })

    const students = await User.find({ role: 'S' }).select(
      '_id name role email UTS_ID',
    )

    const preferences = await Selection.find({ subject: subjectObj._id })

    const preGroups = createBySimilarity(preferences, groupSize)

    let counter = 1

    for (const group of preGroups) {
      const gName = `G-${counter}`
      const topic = getRandomResearchTopic()

      for (const member of group) {
        await Group.create({
          groupName: gName,
          subjectId: subjectObj._id,
          studentId: member._id,
          groupTopic: topic,
        })
      }
      counter++
    }

    const studentsInGroups = new Set()
    for (const group of preGroups) {
      for (const studentObj of group) {
        studentsInGroups.add(studentObj.student)
      }
    }

    const studentsNotInGroups = students.filter(
      (student) => !studentsInGroups.has(student._id),
    )

    const randomGroups = createRandomGroup(studentsNotInGroups, groupSize)
    for (const group of randomGroups) {
      const gName = `G-${counter}`
      const topic = getRandomResearchTopic()

      for (const member of group) {
        await Group.create({
          groupName: gName,
          subjectId: subjectObj._id,
          studentId: member._id,
          groupTopic: topic,
        })
      }
      counter++
    }

    res.status(200).json({ message: 'done' })
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

app.get('/:subjectNo', async (req, res) => {
  try {
    const { subjectNo } = req.params

    if (!subjectNo) {
      throw new Error('Subject number is required')
    }

    const subject = await Subject.findOne({ number: subjectNo })

    if (!subject) {
      throw new Error('Subject does not exist')
    }

    const groups = await Group.aggregate([
      { $match: { subjectId: subject._id } },
      {
        $group: {
          _id: '$groupName',
          members: { $push: '$$ROOT' },
        },
      },
    ])

    const populatedGroups = await Promise.all(
      groups.map(async (group) => {
        return {
          _id: group._id,
          members: await Promise.all(
            group.members.map(
              async (g: {
                studentId: any
                subjectId: any
                _id: any
                groupTopic: any
                requestLeave: any
              }) => {
                const student = await User.findById(g.studentId).select(
                  '_id name role email',
                )
                return {
                  groupId: g._id,
                  student,
                  groupTopic: g.groupTopic,
                  requestLeave: g.requestLeave,
                }
              },
            ),
          ),
        }
      }),
    )

    res.status(200).json(populatedGroups)
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

app.get('/:subjectNo/leave-request', async (req, res) => {
  try {
    const { subjectNo } = req.params

    if (!subjectNo) {
      throw new Error('Subject number is required');
    }
  
    const subject = await Subject.findOne({ number: subjectNo });
  
    if (!subject) {
      throw new Error('Subject does not exist');
    }
  
    const result = await Group.find({
      subjectId: subject._id,
      requestLeave: true,
    });

    const response: any[] = []
    if (result.length > 0) {
      await Promise.all(result.map(async (r) => {
        const student = await User.findById(r.studentId).select('name email UTS_ID');
        
        if (student) {
          const newObj = {
            ...r.toObject(), 
            studentDetail: student
          };
          response.push(newObj);
        }
      }));
    }

    res.status(200).json(response);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
});


app.get('/:subjectNumber/:UTS_ID', async (req, res) => {
  const { subjectNumber, UTS_ID } = req.params

  try {
    const subjectObj = await Subject.findOne({ number: subjectNumber })

    if (!subjectObj) {
      throw new Error('Subject does not exist')
    }

    const studentObj = await User.findOne({ UTS_ID: UTS_ID })

    if (!studentObj) {
      throw new Error('Student does not exist')
    }

    const student = await Group.findOne({
      subjectId: subjectObj._id,
      studentId: studentObj._id,
    })

    const group = await Group.find({
      groupName: student?.groupName,
    })


    const studentGroup = await Promise.all(
      group.map(
        async (g) =>
          await User.findById(g.studentId).select('_id name role email'),
      ),
    )

    const studentLeaveRequest = group.find((student)=>student.requestLeave)

    res.status(200).json({ studentGroup, groupName: student?.groupName, studentLeaveRequest})
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})
// app.get('/:number',async (req, res) => {
//   try {
//     const {number} = req.params
//     const subject = await Subject.findOne({number})
//     res.status(200).json(subject)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

app.post('/new', async (req, res) => {
  try {
    const { groupName, students, subjectNumber } = req.body

    if (!groupName) {
      throw new Error('Group name is required')
    }

    if (students && students.length < 2) {
      throw new Error('Group needs at least 2 members')
    }

    if (!subjectNumber) {
      throw new Error('Subject number is required')
    }

    const subjectObj = await Subject.findOne({ number: subjectNumber })

    if (!subjectObj) {
      throw new Error('Subject does not exist')
    }

    const gName = `G-${groupName}`
    const topic = getRandomResearchTopic()

    const newGroupStudents: Array<any> = []

    for (const student of students) {
      const studentObj = await User.findOne({ _id: student })

      if (!studentObj) {
        throw new Error(`Student does not exist ${student}`)
      }

      const studentGroup = await Group.findOne({ studentId: student })

      if (studentGroup) {
        throw new Error(`Student already in a group ${studentGroup}`)
      }

      /*
       * Now create the group
       */
      const createdStudentGroup = await Group.create({
        groupName: gName,
        studentId: student,
        subjectId: subjectObj._id,
        groupTopic: topic,
      })

      if (createdStudentGroup) {
        newGroupStudents.push(createdStudentGroup.studentId)
      }
    }

    res.status(200).json({ gName, newGroupStudents })
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

app.delete('/:subjectNumber/:studentId', async (req, res) => {
  try {
    const { subjectNumber, studentId } = req.params

    const subjectObj = await Subject.findOne({ number: subjectNumber })

    if (!subjectObj) {
      throw new Error('Subject does not exist')
    }

    const studentObj = await User.findOne({ _id: studentId })

    if (!studentObj) {
      throw new Error('Student does not exist')
    }

    const student = await Group.findOne({
      subjectId: subjectObj._id,
      studentId: studentObj._id,
    })

    if (!student) {
      throw new Error('Student not part of a group')
    }

    student.deleteOne()

    res.json({ message: 'Student deleted' })
  } catch (error) {
    const errorMessage = (error as Error).message
    res.status(500).json({ message: errorMessage })
  }
})

app.delete('/one/:subjectNumber/:groupName', async (req, res) => {
  const { subjectNumber, groupName } = req.params
  const subjectObj = await Subject.findOne({ number: subjectNumber })

  if (!subjectObj) {
    throw new Error('Subject does not exist')
  }

  await Group.deleteMany({ subjectId: subjectObj._id, groupName: groupName })

  res.json({ message: 'done' })
})

app.post('/request-leave/', async (req, res) => {
  try {
    const { UTS_Id, subjectNumber } = req.body
    const user = await User.findOne({ UTS_ID: UTS_Id })
    if (!user) {
      throw new Error('User does not exist')
    }

    const subjectObj = await Subject.findOne({ number: subjectNumber })

    if (!subjectObj) {
      throw new Error('Subject does not exist')
    }

    const response = await Group.findOne({
      subjectId: subjectObj._id,
      studentId: user._id,
    }).updateOne({ requestLeave: true })

    res.status(200).json({ message: response })
  } catch (e) {
    const error = e as Error
    res.status(400).json({ error: error.message })
  }
})


app.post('/request-leave/cancel', async (req, res) => {
  try {
    const { UTS_Id, subjectNumber } = req.body
    const user = await User.findOne({ UTS_ID: UTS_Id })
    if (!user) {
      throw new Error('User does not exist')
    }

    const subjectObj = await Subject.findOne({ number: subjectNumber })

    if (!subjectObj) {
      throw new Error('Subject does not exist')
    }

    const response = await Group.findOne({
      subjectId: subjectObj._id,
      studentId: user._id,
    }).updateOne({ requestLeave: false })

    res.status(200).json({ message: response })
  } catch (e) {
    const error = e as Error
    res.status(400).json({ error: error.message })
  }
})

export default app
