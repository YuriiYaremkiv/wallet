import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import css from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );
};
