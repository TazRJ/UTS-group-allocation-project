import React from 'react'
import Container from '../layout/Container'
import { useAuth } from '../helpers/authProvider'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TeacherTodo from '../layout/sides/teacher/TeacherTodo'
import Resources from '../layout/sides/Resources'
import UpcomingEvents from '../layout/sides/Upcoming'
import StudentTodo from '../layout/sides/StudentTodo'
import TopBanner from '../layout/TopBanner'

export default function Home() {
  const { user } = useAuth()

  return (
    <Container>
      <Box>
        <TopBanner />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
          },
        }}
      >
        <Box
          sx={{
            flexGrow: '1',
            borderRight: {
              xs: 'none',
              sm: 'none',
              md: '1px solid black',
            },
          }}
        >
          <Resources />
        </Box>

        <Box
          sx={{
            flexGrow: '6',
            padding: '1rem',
          }}
        >
          {user && user.role === 'S' ? <StudentTodo /> : <TeacherTodo />}
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ backgroundColor: 'black' }}
        />
        <Box
          sx={{
            flexGrow: '1',
            borderLeft: {
              xs: 'none',
              sm: 'none',
              md: '1px solid black',
            },
          }}
        >
          <UpcomingEvents />
        </Box>
      </Box>
    </Container>
  )
}
