import { useSelector } from 'react-redux';
import { Paper, Box, LinearProgress, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
// import Logo from './Logo';
import { Logo } from 'components/Logo/Logo';

import css from './GlobalLoading.module.scss';

export const GlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
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
          {/* <Logo /> */}
        </Box>
      </Paper>
    </>
  );
};
