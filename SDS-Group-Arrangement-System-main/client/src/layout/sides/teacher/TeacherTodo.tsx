import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../helpers/authentication'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  CircularProgress,
} from '@mui/material'
import { Link } from 'react-router-dom'
import SubjectDashBoard from './SubjectDashBoard'

interface Subject {
  name: string
  number: number
}

export default function TeacherTodo() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [showSubject, setShowSubject] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosInstance
      .get('/subject/all')
      .then((res) => {
        setSubjects(res.data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [])

  function handleReturn() {
    setShowSubject(null)
  }

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div style={{ width: '100%' }}>
        <Typography variant="h5" align="left" gutterBottom>
          Subjects
        </Typography>

        {loading ? (
          <CircularProgress color="inherit" />
        ) : showSubject ? (
          <SubjectDashBoard
            subjectNumber={showSubject}
            handleReturn={handleReturn}
          />
        ) : (
          <List
            sx={{
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {subjects.map((subject, index) => (
              <Button
                key={subject.number}
                style={{ textDecoration: 'none', color: 'black' }}
                onClick={() => setShowSubject(subject.number)}
              >
                <ListItem
                  key={index}
                  sx={{
                    background: '#FAF1F1',
                    borderBottom: '1px solid #ccc',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: '#bfb5b5',
                    },
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingLeft: '5px',
                      gap: 5,
                    }}
                  >
                    <div
                      style={{
                        width: '0.4rem',
                        height: '1.5rem',
                        backgroundColor: 'red',
                        borderRadius: '10px',
                      }}
                    ></div>

                    <p>{subject && subject.name}</p>
                    <p>{subject && subject.number}</p>

                    <ArrowForwardIcon
                      sx={{
                        marginLeft: 'auto',
                        background: '#bfb5b5',
                        borderRadius: '50px',
                        width: '50px',
                        height: '40px',
                      }}
                    />
                  </div>
                </ListItem>
              </Button>
            ))}
          </List>
        )}
      </div>
    </Box>
  )
}
