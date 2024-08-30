import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const initialFormState = {
  dni: '',
  nombres: '',
  apellidos: '',
  nacionalidad: '',
  genero: '',
  curso: ''
};

const MisAlumnos = () => {
  const [open, setOpen] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [currentAlumno, setCurrentAlumno] = useState(initialFormState);
  const [editIndex, setEditIndex] = useState(-1);

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentAlumno(initialFormState);
    setEditIndex(-1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAlumno({ ...currentAlumno, [name]: value });
  };

  const handleSubmit = () => {
    if (editIndex === -1) {
      setAlumnos([...alumnos, currentAlumno]);
    } else {
      const updatedAlumnos = [...alumnos];
      updatedAlumnos[editIndex] = currentAlumno;
      setAlumnos(updatedAlumnos);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setCurrentAlumno(alumnos[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedAlumnos = alumnos.filter((_, i) => i !== index);
    setAlumnos(updatedAlumnos);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<AddIcon />}>
        Añadir Alumno
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex === -1 ? 'Añadir' : 'Editar'} Alumno</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="dni"
            label="DNI"
            type="text"
            fullWidth
            value={currentAlumno.dni}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="nombres"
            label="Nombres"
            type="text"
            fullWidth
            value={currentAlumno.nombres}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="apellidos"
            label="Apellidos"
            type="text"
            fullWidth
            value={currentAlumno.apellidos}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="nacionalidad"
            label="Nacionalidad"
            type="text"
            fullWidth
            value={currentAlumno.nacionalidad}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Género</InputLabel>
            <Select
              name="genero"
              value={currentAlumno.genero}
              onChange={handleInputChange}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Femenino">Femenino</MenuItem>
              
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="curso"
            label="Curso"
            type="text"
            fullWidth
            value={currentAlumno.curso}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editIndex === -1 ? 'Añadir' : 'Actualizar'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>DNI</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Nacionalidad</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno, index) => (
              <TableRow key={index}>
                <TableCell>{alumno.dni}</TableCell>
                <TableCell>{alumno.nombres}</TableCell>
                <TableCell>{alumno.apellidos}</TableCell>
                <TableCell>{alumno.nacionalidad}</TableCell>
                <TableCell>{alumno.genero}</TableCell>
                <TableCell>{alumno.curso}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MisAlumnos;