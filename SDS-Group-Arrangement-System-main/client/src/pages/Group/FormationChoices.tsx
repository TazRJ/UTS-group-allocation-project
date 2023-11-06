import React from 'react'
import Container from '../../layout/Container'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Button, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function FormationChoices() {
  const { number } = useParams()

  const navigate = useNavigate()

  const handleReturn = () => {
    navigate(-1)
  }
  return (
    <Container>
      <Box
        sx={{
          margin: '1rem',
          background: '#E4E4E4',
          borderRadius: '30px',
          paddingY: '2rem',
          marginTop: {
            sx: '1rem',
            sm: '1rem',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginBottom: '1rem',
            paddingX: {
              sx: '1rem',
              md: '4rem',
            },
          }}
        >
          <Typography fontSize={30} sx={{ marginBottom: '2rem' }}>
            {number} Group Formation
          </Typography>
          {/* <Button
            variant="contained"
            onClick={handleReturn}
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
          </Button> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <Link
            to={`/subject/${number}/groups`}
            style={{
              color: 'black',
              textDecoration: 'none',
              width: '40%',
              marginBottom: '1rem',
              background: '#CCEEDA',
              boxShadow: '0px 4px 4px 0px #00000040',
              padding: '8px',
              borderRadius: '20px',
            }}
          >
            <Typography>Groups</Typography>
          </Link>
          <Link
            to={`/subject/${number}/group-assignment`}
            style={{
              color: 'black',
              textDecoration: 'none',
              width: '40%',
              marginBottom: '1rem',
              background: '#DEACAC',
              boxShadow: '0px 4px 4px 0px #00000040',
              padding: '8px',
              borderRadius: '20px',
            }}
          >
            <Typography>Group Assignment</Typography>
          </Link>
          {/* <Link
            to={`/subject/${number}/pending-approval`}
            style={{
              color: 'black',
              textDecoration: 'none',
              width: '40%',
              marginBottom: '1rem',
              background: '#EBCFAD',
              boxShadow: '0px 4px 4px 0px #00000040',
              padding: '8px',
              borderRadius: '20px',
            }}
          >
            <Typography>Pending Approval</Typography>
          </Link> */}
          <Link
            to={`/subject/${number}/student-list`}
            style={{
              color: 'black',
              textDecoration: 'none',
              width: '40%',
              marginBottom: '1rem',
              background: '#E5C6EA',
              boxShadow: '0px 4px 4px 0px #00000040',
              padding: '8px',
              borderRadius: '20px',
            }}
          >
            <Typography>Student List</Typography>
          </Link>
          <Link
            to={`/subject/${number}/pending-approval`}
            style={{
              color: 'black',
              textDecoration: 'none',
              width: '40%',
              marginBottom: '1rem',
              background: '#64b1d0',
              boxShadow: '0px 4px 4px 0px #00000040',
              padding: '8px',
              borderRadius: '20px',
            }}
          >
            <Typography>Pending Approval</Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
