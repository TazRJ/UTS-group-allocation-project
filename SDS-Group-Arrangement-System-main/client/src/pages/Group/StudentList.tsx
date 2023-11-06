import React, { useEffect, useState } from 'react'
import Container from '../../layout/Container'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axiosInstance from '../../helpers/authentication'
import {
  Box,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material'

interface Student {
  UTS_ID: string
  email: string
  name: string
  role: string
  _id: string
}

interface Data {
  students: Student[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'gray',
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
    padding: '8px',
  },
}))

export default function StudentList() {
  const [data, setData] = useState<Data>({ students: [] })
  const [page, setPage] = React.useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const { number } = useParams()

  const fetchStudents = async () => {
    try {
      const studentsResponse = await axiosInstance.get('/students/all')
      setData((prevData) => ({
        ...prevData,
        students: studentsResponse.data,
      }))
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
  }

  const filteredStudents = data.students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Container>
      <Box
        sx={{
          marginX: '1.5rem',
        }}
      >
        <Typography align="left" sx={{ fontSize: 24 }}>
          {number} Students
        </Typography>

        <Box
          sx={{
            maxWidth: '50%',
            marginY: '0.5em',
          }}
        >
          <TextField
            fullWidth
            label="Search"
            id="fullWidth"
            margin="dense"
            variant="outlined"
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            sx={{ paddingY: '5px' }}
            onChange={handleSearch}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="table pagination">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Full Name</StyledTableCell>
                <StyledTableCell>Student Number</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.slice(page * 10, page * 10 + 10).map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.UTS_ID}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.UTS_ID}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={filteredStudents.length}
                  rowsPerPage={10}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
