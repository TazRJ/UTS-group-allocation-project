import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../helpers/authentication'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Button, List, ListItem, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from '../../Container'

interface Subject {
  name: string
  number: number
}

export default function SubjectDashBoard({ subjectNumber, handleReturn }: any) {
  const [subjectDetails, setSubjectDetails] = useState({ name: '', number: '' })
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get(`/subject/${subjectNumber}`).then((res) => {
      setSubjectDetails(res.data)
    })
  }, [])

  return (
    <Box sx={{ background: '#F5F5F5', borderRadius: '30px', padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        {subjectDetails.name && (
          <Typography variant="h5" align="left" gutterBottom>
            {subjectDetails.number} {subjectDetails.name}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={() => handleReturn()}
          sx={{
            background: '#FAF1F1',
            borderRadius: '20px',
            textTransform: 'none',
            color: 'black',
            '&:hover': {
              backgroundColor: '#bfb5b5',
            },
          }}
        >
          Back
        </Button>
      </Box>

      <Box>
        <Typography align="left">Class: </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginTop: '1rem',
          }}
        >
          <Box sx={{ display: 'flex', gap: '3rem' }}>
            <Link
              to={`/subject/${subjectNumber}/group-formation`}
              style={{ flex: 1, color: 'black', textDecoration: 'none' }}
            >
              {' '}
              <div
                style={{
                  width: '100%',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'white',
                  boxShadow: '0px 4px 4px 0px #00000040',
                  padding: '8px',
                  borderRadius: '20px',
                  gap: 5,
                }}
              >
                <div
                  style={{
                    width: '0.4rem',
                    height: '1.5rem',
                    backgroundColor: '#2D8F95',
                    borderRadius: '10px',
                  }}
                ></div>
                <Typography>Groups</Typography>
                <ArrowForwardIcon
                  sx={{
                    marginLeft: 'auto',
                    background: '#bfb5b5',
                    borderRadius: '50px',
                    width: '30px',
                    height: '30px',
                  }}
                />
              </div>
            </Link>
            <Link
              to={`/subject/${subjectNumber}/student-list`}
              style={{ flex: 1, color: 'black', textDecoration: 'none' }}
            >
              {' '}
              <div
                style={{
                  width: '100%',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'white',
                  boxShadow: '0px 4px 4px 0px #00000040',
                  padding: '8px',
                  borderRadius: '20px',
                  gap: 5,
                }}
              >
                <div
                  style={{
                    width: '0.4rem',
                    height: '1.5rem',
                    backgroundColor: '#2D8F95',
                    borderRadius: '10px',
                  }}
                ></div>
                <Typography>People</Typography>
                <ArrowForwardIcon
                  sx={{
                    marginLeft: 'auto',
                    background: '#bfb5b5',
                    borderRadius: '50px',
                    width: '30px',
                    height: '30px',
                  }}
                />
              </div>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: '3rem' }}>
            <Link
              to={`/not-scope`}
              style={{ flex: 1, color: 'black', textDecoration: 'none' }}
            >
              {' '}
              <div
                style={{
                  width: '100%',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'white',
                  boxShadow: '0px 4px 4px 0px #00000040',
                  padding: '8px',
                  borderRadius: '20px',
                  gap: 5,
                }}
              >
                <div
                  style={{
                    width: '0.4rem',
                    height: '1.5rem',
                    backgroundColor: '#2D8F95',
                    borderRadius: '10px',
                  }}
                ></div>
                <Typography>Marks</Typography>
                <ArrowForwardIcon
                  sx={{
                    marginLeft: 'auto',
                    background: '#bfb5b5',
                    borderRadius: '50px',
                    width: '30px',
                    height: '30px',
                  }}
                />
              </div>
            </Link>
            <Link
              to={`/not-scope`}
              style={{ flex: 1, color: 'black', textDecoration: 'none' }}
            >
              {' '}
              <div
                style={{
                  width: '100%',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'white',
                  boxShadow: '0px 4px 4px 0px #00000040',
                  padding: '8px',
                  borderRadius: '20px',
                  gap: 5,
                }}
              >
                <div
                  style={{
                    width: '0.4rem',
                    height: '1.5rem',
                    backgroundColor: '#2D8F95',
                    borderRadius: '10px',
                  }}
                ></div>
                <Typography>Modules</Typography>
                <ArrowForwardIcon
                  sx={{
                    marginLeft: 'auto',
                    background: '#bfb5b5',
                    borderRadius: '50px',
                    width: '30px',
                    height: '30px',
                  }}
                />
              </div>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
