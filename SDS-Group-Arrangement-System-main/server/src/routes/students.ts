import express from 'express'
import User from '../model/user/userModel'
import Group from '../model/group/groupModel'
import Subject from '../model/subject/subjectModel'

const app = express()
app.get('/all', async (req, res) => {
  try {
    const students = await User.find({ role: 'S' }).select('_id name role email UTS_ID');
    const studentIds = students.map((student) => student._id);

    // Find groups for students
    const groups = await Group.find({ studentId: { $in: studentIds } });

    // Collect all subjectIds from groups
    const subjectIds = groups.map((group) => group.subjectId);

    // Find subjects for all subjectIds
    const subjectPromises = subjectIds.map((subjectId) => Subject.findOne({ _id: subjectId }));

    // Resolve all subject queries concurrently
    const subjects = await Promise.all(subjectPromises);

    const result = students.map((student) => {
      const group = groups.find((group) => group.studentId.equals(student._id));
      const subject = group ? subjects.find((subj) => subj!._id.equals(group.subjectId)) : null;

      return {
        _id: student._id,
        name: student.name,
        role: student.role,
        email: student.email,
        UTS_ID: student.UTS_ID,
        group: group ? [group.groupName, subject?.number] : null,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
});


// app.get('/:id',async (req, res) => {
//   try {
//     const {id} = req.params
//     const subject = await User.findOne({id})
//     res.status(200).json(subject)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

export default app
