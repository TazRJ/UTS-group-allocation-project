import React, { useEffect, useState } from 'react'
import Container from '../../layout/Container'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../helpers/authentication'
import { AuthProvider, useAuth } from '../../helpers/authProvider'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

export default function PendingApproval() {
  const [data, setData] = useState([])
  const { number } = useParams()
  const { user } = useAuth()

  useEffect(() => {
    const fetch = async () => {
      const selectionResponse = await axiosInstance.get(
        `/groups/${number}/leave-request`,
      )
      setData(selectionResponse.data)
    }
    fetch()
  }, [])

  const handleRemoveStudent = async (studentId: any) => {
    try {
      const del = await axiosInstance.delete(`/groups/${number}/${studentId}`);
      window.location.reload()
    } catch (err) {
      //   setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }
  return (
    <Container>
      <h2>{number} Pending Group Leave Requests</h2>
      <div style={{ padding: '0px 4rem', marginTop: '1rem' }}>
        {data.length > 0 ? (
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>GroupName</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>UTS Number</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 &&
                  data.map((row:any) => (
                    <TableRow
                      key={row.groupName}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.groupName}
                      </TableCell>
                      <TableCell>{row.studentDetail.name}</TableCell>
                      <TableCell>{row.studentDetail.email}</TableCell>
                      <TableCell>{row.studentDetail.UTS_ID}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleRemoveStudent(row.studentId)}
                        >
                          Remove Student
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h4>No New Requests</h4>
        )}
      </div>
    </Container>
  )
}
