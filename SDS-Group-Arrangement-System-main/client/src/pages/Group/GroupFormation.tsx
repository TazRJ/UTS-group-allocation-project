import React, { useEffect, useState } from 'react'
import Container from '../../layout/Container'
import axiosInstance from '../../helpers/authentication'
import { useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ConfirmationDialog from './ConfirmationDialog'
import DeleteIcon from '@mui/icons-material/Delete'

interface Group {
  _id: string
  members: Array<{ student: { _id: string } }>
}

interface Student {
  email: string
  name: string
  role: string
  _id: string
}
interface Data {
  groups: Group[]
  students: Student[]
}

interface NewGroup {
  groupName: string
  students: Array<string>
}

export default function GroupFormation() {
  const { number } = useParams()
  const [data, setData] = useState<Data>({ groups: [], students: [] })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [autoFill, setAutoFill] = useState({ preference: false, random: false })
  const [newFormation, setNewFormation] = useState(false)
  const [newGroup, setNewGroup] = useState<NewGroup>({
    groupName: '',
    students: [],
  })

  const [groupCreateError, setGroupCreateError] = useState('')
  const [confirm, setConfirm] = useState(false)

  const fetchGroups = async () => {
    try {
      const groupResponse = axiosInstance.get(`/groups/${number}`)
      return groupResponse
    } catch (err) {
      throw err
    }
  }

  const fetchStudents = async () => {
    try {
      const studentsResponse = axiosInstance.get('/students/all')
      return studentsResponse
    } catch (err) {
      throw err
    }
  }

  const fetchData = async () => {
    try {
      const [groupsResponse, studentsResponse] = await Promise.all([
        fetchGroups(),
        fetchStudents(),
      ])

      const filteredData = groupsResponse.data.filter((group: { members: any }) => {
        for (const member of group.members) {
          if (member.student) {
            return true; 
          }
        }
        return false; 
      });
      setData((prevData) => ({
        ...prevData,
        groups: filteredData,
        students: studentsResponse.data,
      }))
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [number])

  const handleOnDrag = (e: React.DragEvent, student: string) => {
    e.dataTransfer.setData('studentId', student)
  }

  const handleOnDropNewGroup = (e: React.DragEvent) => {
    const studentId = e.dataTransfer.getData('studentId') as string

    if (newGroup.students.includes(studentId)) {
      setGroupCreateError('Student already added')
      return
    }

    const inGroup = checkIfStudentInGroup(studentId)
    if (inGroup) {
      setGroupCreateError(`Student is already a member in ${inGroup}`)
      return
    }
    setNewGroup({ ...newGroup, students: [...newGroup.students, studentId] })
  }

  const handleOnDropRemoveStudent = async (e: React.DragEvent) => {
    const studentId = e.dataTransfer.getData('studentId') as string
    try {
      const del = await axiosInstance.delete(`/groups/${number}/${studentId}`)
      fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const checkIfStudentInGroup = (studentId: string) => {
    for (const group of data.groups) {
      for (const member of group.members) {
        if (member.student._id === studentId) {
          return group._id
        }
      }
    }
    return null
  }

  if (groupCreateError) {
    setTimeout(() => {
      setGroupCreateError('')
    }, 2000)
  }

  const handleCreateGroup = async () => {
    if (!newGroup.groupName) {
      setGroupCreateError('Please add group name')
      return
    }
    try {
      const res = await axiosInstance.post('/groups/new', {
        ...newGroup,
        subjectNumber: number,
      })

      if (res.status === 200) {
        fetchData()
        setNewGroup({ groupName: '', students: [] })
        setNewFormation(false)
      }
    } catch (err) {
      setIsLoading(false)
    }
  }

  const handleCreateGroupRandom = async (size: any) => {
    try {
      const res = await axiosInstance.post(
        `/groups/${
          (autoFill.preference && 'preference') || (autoFill.random && 'random')
        }`,
        {
          groupSize: size,
          subjectNumber: number,
        },
      )

      if (res.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      setIsLoading(false)
    }
  }

  const handleCreateGroupPreference = async (size: any) => {
    try {
      const res = await axiosInstance.post(
        `/groups/${
          (autoFill.preference && 'preference') || (autoFill.random && 'random')
        }`,
        {
          groupSize: size,
          subjectNumber: number,
        },
      )

      if (res.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      setIsLoading(false)
    }
  }

  const deleteOneGroup = async (group: any) => {
    try {
      const res = await axiosInstance.delete(`/groups/one/${number}/${group._id}`)
      fetchData()

    } catch (e) {}
  }

  console.log(data)

  return (
    <Container>
      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ display: 'flex' }}>
            {/* {error && <div>Error: {error}</div>} */}
            <Box
              sx={{
                flex: '1',
              }}
            >
              <Typography sx={{ fontWeight: '600' }}>Current Groups</Typography>
              <>
                {newFormation ? (
                  <Box
                    sx={{
                      background: '#f5f0f0',
                      color: 'black',
                      borderRadius: '30px',
                      padding: '1rem',
                      width: { md: '80%', xs: '85%' },
                      margin: 'auto',
                      marginY: '2rem',
                    }}
                    onDrop={handleOnDropNewGroup}
                    onDragOver={handleDragOver}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <TextField
                        value={newGroup.groupName}
                        autoFocus
                        label="Group Name"
                        margin="dense"
                        size="small"
                        variant="standard"
                        onChange={(e) =>
                          setNewGroup({
                            ...newGroup,
                            groupName: e.target.value,
                          })
                        }
                        sx={{
                          width: '20%',
                          '& input': { textAlign: 'center' },
                        }}
                      />
                      <IconButton
                        edge="end"
                        color="error"
                        aria-label="close"
                        onClick={() => {
                          setNewGroup({ groupName: '', students: [] })
                          setNewFormation(false)
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    {groupCreateError && (
                      <Typography
                        variant="body1"
                        color="error"
                        sx={{ marginY: '1rem' }}
                      >
                        {groupCreateError}
                      </Typography>
                    )}

                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginTop: '2rem',
                      }}
                    >
                      {newGroup.students.map((id) =>
                        data.students.map((student: any) => {
                          return student._id === id ? (
                            <div
                              key={student._id}
                              style={{
                                background: '#d9d9d9',
                                color: 'black',
                                borderRadius: '30px',
                                textTransform: 'none',
                                marginBottom: '1rem',
                                paddingTop: '0.5rem',
                                paddingBottom: '0.5rem',
                                width: '40%',
                              }}
                            >
                              {student.name}
                            </div>
                          ) : null
                        }),
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      disabled={newGroup.students.length < 2}
                      sx={{
                        // background: '#FAF1F1',
                        borderRadius: '20px',
                        textTransform: 'none',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#bfb5b5',
                        },
                      }}
                      onClick={handleCreateGroup}
                    >
                      Create
                    </Button>
                  </Box>
                ) : (
                  <>
                    <Button
                      sx={{
                        background: '#CEEB8F',
                        color: 'black',
                        borderRadius: '30px',
                        textTransform: 'none',
                        margin: 'auto',
                        marginY: '1rem',
                        border: '1px solid black',
                      }}
                      onClick={() => setNewFormation(true)}
                    >
                      Create New Group
                    </Button>
                  </>
                )}
              </>
              <Box
                sx={{
                  flex: '1',
                  maxHeight: '700px',
                  overflowY: 'scroll',
                }}
              >
                {data.groups &&
                  data.groups.map((group: any, _index) => (
                    <Box
                      key={group._id}
                      sx={{
                        background: '#f5f0f0',
                        color: 'black',
                        borderRadius: '30px',
                        padding: '1rem',
                        width: { md: '80%', xs: '85%' },
                        margin: 'auto',
                        marginBottom: '2rem',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography>Group: {group._id}</Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            // gap: '4',
                          }}
                        >
                          <p>{group.members.length}</p>
                          <Divider
                            orientation="vertical"
                            sx={{
                              background: 'black',
                              height: '2rem',
                              marginX: '0.5rem',
                            }}
                          />
                          <DeleteIcon
                            onClick={()=>deleteOneGroup(group)}
                            sx={{
                              color: 'initial',
                              '&:hover': {
                                color: 'red',
                                cursor: 'pointer',
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography
                        align="left"
                        sx={{ color: '#726D6D', marginBottom: '1rem' }}
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
                        {group.members.map((member: any, _index: any) => member.student && (
                          <React.Fragment key={member.groupId}>
                            <Button
                              sx={{
                                background: '#d9d9d9',
                                color: 'black',
                                borderRadius: '30px',
                                textTransform: 'none',
                                // marginBottom: '1rem',
                                width: '40%',
                              }}
                              draggable
                              onDragStart={(e) =>
                                handleOnDrag(e, member.student._id)
                              }
                            >
                              {member.student.name}
                            </Button>
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
            <Divider
              orientation="vertical"
              variant="fullWidth"
              sx={{ background: 'black', height: '70vh' }}
            />
            <Box sx={{ flex: '1' }}>
              <Box
                sx={{
                  background: '#f5f0f0',
                  width: { md: '80%', xs: '95%' },
                  margin: 'auto',
                  borderRadius: '30px',
                  marginBottom: '1rem',
                  padding: {
                    md: '0.5rem',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={autoFill.preference}
                          onClick={() =>
                            setAutoFill({ preference: true, random: false })
                          }
                        />
                      }
                      label="Auto-fill by Preference"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={autoFill.random}
                          onClick={() =>
                            setAutoFill({ preference: false, random: true })
                          }
                        />
                      }
                      label="Auto-fill by Randomly"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      sx={{
                        background: '#c97070',
                        color: 'white',
                        borderRadius: '30px',
                        textTransform: 'none',
                        padding: '0.5rem',
                      }}
                      onClick={() => (autoFill.preference || autoFill.random) && setConfirm(true)}
                    >
                      Confirm Auto-fill
                    </Button>
                  </FormGroup>
                </Box>
              </Box>
              <Box
                sx={{
                  background: '#f5f0f0',
                  width: { md: '80%', xs: '95%' },
                  margin: 'auto',
                  borderRadius: '30px',

                  padding: {
                    md: '1rem',
                  },
                }}
              >
                <Typography sx={{ fontWeight: '600' }} align="left">
                  Student List
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginY: '1rem',
                    gap: '1rem',
                    maxHeight: '600px',
                    overflowY: 'scroll',
                  }}
                  onDrop={handleOnDropRemoveStudent}
                  onDragOver={handleDragOver}
                >
                  {data.students.map((student: any) => {
                    return (
                      <Button
                        key={student._id}
                        sx={{
                          width: '40%',
                          // background: '#d9d9d9',
                          color: 'white',
                          borderRadius: '30px',
                          textTransform: 'none',
                          marginBottom: '1rem',
                        }}
                        style={{ background: student.group && student.group[1]=== number ? 'red' : 'green' }}
                        draggable
                        onDragStart={(e) => handleOnDrag(e, student._id)}
                      >
                        {student.name}
                      </Button>
                    )
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {autoFill.preference && confirm && (
          <ConfirmationDialog
            autoFill={setAutoFill}
            handleCreateGroup={handleCreateGroupPreference}
            setConfirm={setConfirm}
          />
        )}
        {autoFill.random && confirm && (
          <ConfirmationDialog
            autoFill={setAutoFill}
            handleCreateGroup={handleCreateGroupRandom}
            setConfirm={setConfirm}
          />
        )}
      </Box>
    </Container>
  )
}
