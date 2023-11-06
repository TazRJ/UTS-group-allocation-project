import React, { useEffect, useState, useRef } from 'react'
import Container from '../../layout/Container'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../helpers/authentication'
import { Box, Button, Typography } from '@mui/material'

interface Group {
  _id: string
  members: Array<{ student: { _id: string } }>
}

interface Data {
  groups: Group[]
}

export default function GroupsList() {
  const [data, setData] = useState<Data>({ groups: [] })
  const groupBoxesRef = useRef<any>([])

  const { number } = useParams()

  const fetchStudents = async () => {
    try {
      const groupResponse = await axiosInstance.get(`/groups/${number}`)
      const filteredData = groupResponse.data.filter(
        (group: { members: any }) => {
          for (const member of group.members) {
            if (member.student) {
              return true
            }
          }
          return false
        },
      )
      setData((prevData) => ({
        ...prevData,
        groups: filteredData,
      }))
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    const tallestHeight = Math.max(
      ...groupBoxesRef.current.map(
        (ref: { clientHeight: any }) => ref.clientHeight,
      ),
    )

    groupBoxesRef.current.forEach((ref: { style: { height: string } }) => {
      ref.style.height = `${tallestHeight}px`
    })
  }, [data.groups])

  return (
    <Container>
      <h1>{number} Groups</h1>
      {data.groups.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {data.groups &&
            data.groups.map((group: any, index) => (
              <Box
                key={group._id}
                ref={(boxRef) => (groupBoxesRef.current[index] = boxRef)}
                sx={{
                  background: '#f5f0f0',
                  color: 'black',
                  borderRadius: '30px',
                  padding: '1rem',
                  width: { md: '40%', xs: '35%' },
                  margin: 'auto',
                  marginBottom: '2rem',
                  minHeight: '100px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>Group: {group._id}</Typography>
                  <Typography>
                  {group.members.length}
                  </Typography>
                </Box>
                <Typography
                  align="left"
                  sx={{ color: '#726D6D', marginBottom: '2rem' }}
                >
                  Topic: {group.members[0].groupTopic}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  {group.members.map(
                    (member: any, index: any) =>
                      member.student && (
                        <React.Fragment key={member.groupId}>
                          <Button
                            sx={{
                              background: '#d9d9d9',
                              color: 'black',
                              borderRadius: '30px',
                              textTransform: 'none',
                              marginBottom: '1rem',
                              width: '40%',
                            }}
                          >
                            {member.student.name}
                          </Button>
                        </React.Fragment>
                      ),
                  )}
                </Box>
              </Box>
            ))}
        </Box>
      ) : (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
          }}
        >
          <Typography variant="h4" color="textSecondary">
            No groups to display
          </Typography>
        </Box>
      )}
    </Container>
  )
}
