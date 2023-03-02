import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import css from './CommentHover.module.scss';

export const CommentHover = ({ comment }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  let newComment = '';
  let otherComment = '';

  if (comment.length > 12) {
    newComment = `${comment.slice(0, 10)}...`;
    otherComment = comment;
  } else {
    newComment = comment;
  }

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={css.comment}
      >
        {newComment}
      </Typography>

      {otherComment ? (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{otherComment}</Typography>
        </Popover>
      ) : null}
    </div>
  );
};
