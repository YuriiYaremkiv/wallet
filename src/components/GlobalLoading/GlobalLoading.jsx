import { Paper, Box, LinearProgress, Toolbar } from '@mui/material';
import { Logo } from 'components/Logo/Logo';

export const GlobalLoading = () => {
  return (
    <Paper
      sx={{
        pointerEvents: 'none',
        transition: 'all .3s ease',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 999,
      }}
    >
      <Toolbar />
      <LinearProgress color="secondary" />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Logo />
      </Box>
    </Paper>
  );
};
