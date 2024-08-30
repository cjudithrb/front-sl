import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  Container,
  Grow,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  TextField,
  alpha,
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaletteIcon from '@mui/icons-material/Palette';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const StyledCard = styled(Card)(({ theme, bgcolor }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 8px 40px -12px ${alpha(bgcolor || theme.palette.primary.main, 0.3)}`,
  },
  backgroundColor: alpha(bgcolor || theme.palette.primary.main, 0.05),
  border: `1px solid ${alpha(bgcolor || theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.shape.borderRadius * 2,
}));

const StyledAvatar = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 80,
  height: 80,
  marginBottom: theme.spacing(2),
  backgroundColor: bgcolor || theme.palette.primary.main,
  boxShadow: `0 8px 20px -12px ${alpha(bgcolor || theme.palette.primary.main, 0.5)}`,
}));

const StyledChip = styled(Chip)(({ theme, bgcolor }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: alpha(bgcolor || theme.palette.primary.main, 0.1),
  color: bgcolor || theme.palette.primary.main,
  '& .MuiChip-icon': {
    color: bgcolor || theme.palette.primary.main,
  },
}));

const SessionCard = styled(Card)(({ theme, bgcolor }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  backgroundColor: alpha(bgcolor || theme.palette.primary.main, 0.05),
  border: `1px solid ${alpha(bgcolor || theme.palette.primary.main, 0.1)}`,
  '&:hover': {
    backgroundColor: alpha(bgcolor || theme.palette.primary.main, 0.1),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 20px -8px ${alpha(bgcolor || theme.palette.primary.main, 0.2)}`,
  },
  borderRadius: theme.shape.borderRadius * 1.5,
}));

const ColorOption = styled('div')(({ color }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: color,
  cursor: 'pointer',
  margin: 4,
  border: '2px solid white',
  boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}));

const StyledButton = styled(Button)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || theme.palette.primary.main,
  color: theme.palette.getContrastText(bgcolor || theme.palette.primary.main),
  '&:hover': {
    backgroundColor: alpha(bgcolor || theme.palette.primary.main, 0.8),
  },
}));

const SessionLabel = styled(Typography)(({ theme, bgcolor }) => ({
  display: 'inline-block',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(bgcolor || theme.palette.primary.main, 0.1),
  color: bgcolor || theme.palette.primary.main,
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

function CourseCard({ courseName, day, time, initialColor, initialImage }) {
  const [open, setOpen] = useState(false);
  const [colorMenuAnchor, setColorMenuAnchor] = useState(null);
  const [cardColor, setCardColor] = useState(initialColor || '#1976d2');
  const [courseImage, setCourseImage] = useState(initialImage || null);
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAttendanceClick = () => navigate(`/dashboard/attendance/${courseName}`);

  const handleColorMenuOpen = (event) => setColorMenuAnchor(event.currentTarget);
  const handleColorMenuClose = () => setColorMenuAnchor(null);

  const handleColorChange = (color) => {
    setCardColor(color);
    handleColorMenuClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCourseImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const colorOptions = ['#1976d2', '#388e3c', '#d32f2f', '#f57c00', '#7b1fa2', '#c2185b'];

  return (
    <>
      <StyledCard bgcolor={cardColor}>
        <CardContent>
          <Box display="flex" alignItems="center" flexDirection="column" position="relative">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id={`image-upload-${courseName}`}
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor={`image-upload-${courseName}`}>
              <IconButton 
                component="span" 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0,
                  color: cardColor,
                  backgroundColor: alpha(cardColor, 0.1),
                  '&:hover': {
                    backgroundColor: alpha(cardColor, 0.2),
                  },
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            </label>
            <StyledAvatar alt={courseName} src={courseImage} bgcolor={cardColor}>
              {!courseImage && courseName.charAt(0)}
            </StyledAvatar>
            <Typography variant="h6" component="div" align="center" gutterBottom color={cardColor}>
              {courseName}
            </Typography>
            <StyledChip
              icon={<CalendarTodayIcon />}
              label={`Días: ${day}`}
              bgcolor={cardColor}
            />
            <StyledChip
              icon={<AccessTimeIcon />}
              label={`Horario: ${time}`}
              bgcolor={cardColor}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <StyledButton variant="contained" bgcolor={cardColor} fullWidth sx={{ mr: 1 }}>
              Añadir
            </StyledButton>
            <StyledButton variant="contained" bgcolor={cardColor} fullWidth sx={{ ml: 1 }} onClick={handleClickOpen}>
              Ver Sesiones
            </StyledButton>
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <IconButton onClick={handleColorMenuOpen} sx={{ color: cardColor }}>
              <PaletteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </StyledCard>

      <Menu
        anchorEl={colorMenuAnchor}
        open={Boolean(colorMenuAnchor)}
        onClose={handleColorMenuClose}
      >
        <Box display="flex" flexWrap="wrap" p={1}>
          {colorOptions.map((color) => (
            <ColorOption
              key={color}
              color={color}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </Box>
      </Menu>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullScreen={fullScreen}
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'white',
            borderRadius: theme.shape.borderRadius * 2,
          },
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color={cardColor}>{courseName}</Typography>
            <IconButton
              edge="end"
              onClick={handleClose}
              aria-label="close"
              sx={{ color: cardColor }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <StyledAvatar alt={courseName} src={courseImage} sx={{ width: 100, height: 100 }} bgcolor={cardColor}>
              {!courseImage && courseName.charAt(0)}
            </StyledAvatar>
            <Typography variant="h5" component="div" mt={2} fontWeight="bold" color={cardColor}>
              {courseName}
            </Typography>
            <Typography variant="body1" color={alpha(cardColor, 0.7)} fontWeight="bold">
              Días: {day}
            </Typography>
            <Typography variant="body2" color={alpha(cardColor, 0.7)} mb={2}>
              Horario: {time}
            </Typography>
          </Box>
          {[1, 2, 3].map((session) => (
            <SessionCard key={session} bgcolor={cardColor}>
              <Box>
                <SessionLabel bgcolor={cardColor}>
                  Sesión N° {session}
                </SessionLabel>
                <Typography variant="body2" color={alpha(cardColor, 0.7)}>
                  {new Date(2023, 0, 13 + session).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}
                </Typography>
              </Box>
              <StyledButton
                variant="contained"
                bgcolor={cardColor}
                onClick={handleAttendanceClick}
                sx={{ borderRadius: '20px', textTransform: 'none' }}
              >
                Ver Asistencia
              </StyledButton>
            </SessionCard>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function DashboardDefault() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('https://backend-as-sp-r4hbqw2mzq-uc.a.run.app/courses/getCourse')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis Cursos
        </Typography>
        <Grid container spacing={3}>
          {courses.map((course, index) => (
            <Grow
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              {...{ timeout: 1000 + index * 200 }}
              key={index}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CourseCard 
                  courseName={course.name} 
                  day="Lunes, Miércoles"
                  time="7:00 - 9:00 am"
                  initialColor="#1976d2"
                  initialImage={null}
                />
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}