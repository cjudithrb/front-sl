import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const attendanceData = [
  { id: 1, name: 'Figueroa Millan Daniel', course: 'Ingles', session: 'S1', date: '1/06/2024', status: 'Bien' },
  { id: 2, name: 'Garcia Lopez Ana', course: 'Ingles', session: 'S1', date: '1/06/2024', status: 'Bien' },
  { id: 3, name: 'Martinez Rodriguez Carlos', course: 'Ingles', session: 'S1', date: '1/06/2024', status: 'Mal' },
  { id: 4, name: 'Hernandez Gomez Maria', course: 'Ingles', session: 'S1', date: '1/06/2024', status: 'Bien' },
  { id: 5, name: 'Lopez Sanchez Juan', course: 'Ingles', session: 'S1', date: '1/06/2024', status: 'Bien' },
  { id: 6, name: 'Perez Torres Laura', course: 'Ingles', session: 'S1', date: '1/06/2024', status: 'Mal' },
];

export default function Component() {
  const { courseId } = useParams();
  const [selectedOption, setSelectedOption] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleOptionChange = (id, value) => {
    setSelectedOption((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Submitted attendance:', selectedOption);
    // Here you would typically send this data to your backend
  };

  const filteredData = attendanceData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Hoy - Curso de Inglés
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Sesión 1: Introducción</Typography>
            <Box>
              <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                Importar
              </Button>
              <Button variant="contained" color="secondary">
                Exportar
              </Button>
            </Box>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar Alumno"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Apellidos y Nombres</StyledTableCell>
                  <StyledTableCell>Curso</StyledTableCell>
                  <StyledTableCell>Sesión</StyledTableCell>
                  <StyledTableCell>Fecha</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Asistencia</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.course}</TableCell>
                    <TableCell>{row.session}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell style={{ color: row.status === 'Bien' ? 'green' : 'red' }}>
                      {row.status}
                    </TableCell>
                    <TableCell>
                      <RadioGroup
                        row
                        value={selectedOption[row.id] || ''}
                        onChange={(e) => handleOptionChange(row.id, e.target.value)}
                      >
                        <FormControlLabel value="A" control={<StyledRadio />} label="A" />
                        <FormControlLabel value="T" control={<StyledRadio />} label="T" />
                        <FormControlLabel value="F" control={<StyledRadio />} label="F" />
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar Asistencia
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}