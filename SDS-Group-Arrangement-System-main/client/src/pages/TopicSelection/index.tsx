import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../helpers/authentication'
import Container from '../../layout/Container'
import Box from '@mui/material/Box'
import TopicSelectionForm from './TopicSelectionForm'
import { useAuth } from '../../helpers/authProvider'
import WaitingStatus from '../../component/WaitingStatus'
import { Button, CircularProgress, LinearProgress } from '@mui/material'
import Approved from './Approved'

interface StudentSelection {
  [key: string]: unknown
}

export default function TopicSelection() {
  const [group, setGroup] = useState({})
  const [selections, setSelections] = useState<StudentSelection>({})

  const [approved, setApproved] = useState<string | boolean>('start')
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true) // Set loading to true initially

  const { number } = useParams()
  const { user } = useAuth()

  const fetchData = async () => {
    try {
      setLoading(true);
      const groupResponse = await axiosInstance.get(`/groups/${number}/${user.UTS_Id}`);
      setGroup(groupResponse.data);

      if (groupResponse.data.studentGroup.length > 0) {
        setApproved(true);
      } else {
        const selectionResponse = await axiosInstance.get(`/selection/${number}/${user.UTS_Id}`);
        if (selectionResponse.data.student) {
          setApproved(false);
          setSelections(selectionResponse.data);
        }
      }
    } catch (error:any) {
      setErr(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <Container>
      <Box sx={{ marginX: '1.5rem', paddingLeft: '1rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <Typography sx={{ textAlign: 'left' }}>
            {number} Topic Selection
          </Typography>
        </div>

        {loading ? (
          <CircularProgress sx={{ background: 'gray' }} />
        ) : approved === 'start' ? (
          <TopicSelectionForm number={number} />
        ) : !approved && selections.student ? (
          <WaitingStatus />
        ) : (
          <Approved group={group} />
        )}

        {err && (
          <Typography variant="body1" color="error">
            {err}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
