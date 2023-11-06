import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import axiosInstance from '../../helpers/authentication'
import Button from '@mui/material/Button'
import { CircularProgress, Icon } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link } from 'react-router-dom'

interface Subject {
  name: string
  number: number
}

export default function ThingsToDo() {
  const [subjects, setSubjects] = useState<Subject[]>([])
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

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div style={{ width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Things To Do
        </Typography>
        {loading ? ( // Display loading indicator when data is being fetched
          <CircularProgress color="inherit" />
        ) : (
          <List sx={{ justifyContent: 'center' }}>
            {subjects.map((subject, index) => (
              <Link
                key={subject.number}
                to={`/subject/${subject.number}`}
                style={{ textDecoration: 'none', color: 'black' }}
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
                    marginBottom: '30px',
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
              </Link>
            ))}
          </List>
        )}
      </div>
    </Box>
  )
}
