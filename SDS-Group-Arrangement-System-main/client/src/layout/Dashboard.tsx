import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import StudentTodo from './sides/StudentTodo'
import TeacherTodo from './sides/teacher/TeacherTodo'
import Resources from './sides/Resources'
import UpcomingEvents from './sides/Upcoming'

export default function Dashboard({ user }: any) {

  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 0.3 }}>
          <Resources />
        </div>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ backgroundColor: 'black' }}
        />
        <div style={{ flex: 1 }}>
          {user && user.role === 'S' ? <StudentTodo /> : <TeacherTodo />}
        </div>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ backgroundColor: 'black' }}
        />
        <div style={{ flex: 0.3 }}>
          <UpcomingEvents />
        </div>
      </div>
    </Box>
  )
}
