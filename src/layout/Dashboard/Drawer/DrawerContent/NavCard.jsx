// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

// assets
import avatar from 'assets/images/users/avatar-group.png';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

export default function NavCard() {
  return (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
      <Stack alignItems="center" spacing={2.5}>
        <CardMedia component="img" image={avatar} sx={{ width: 112 }} />
        <Stack alignItems="center">
          <Typography variant="h5">Soporte 24/7</Typography>
          <Typography variant="h6" color="secondary">
            Contacto directo con soporte
          </Typography>
        </Stack>
        <AnimateButton>
          <Button component={Link} target="_blank" href="https://wa.me/51952841852" variant="contained" color="success" size="small">
           Contactar
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  );
}
