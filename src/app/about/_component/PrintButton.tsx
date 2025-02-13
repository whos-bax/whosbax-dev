'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const PrintButton = () => {
  const toggleButton = () => {
    window.print();
  };

  return (
    <IconButton
      id={'print-button'}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: { xs: '20px', lg: 'calc(50% - 550px + 20px)' },
        width: 'fit-content',
        backgroundColor: 'var(--green)',
        border: '1px solid var(--green)',
        zIndex: 9999,
        svg: {
          fill: 'white',
        },
        '&:hover': {
          svg: {
            fill: 'var(--green)',
          },
        },
      }}
      onClick={toggleButton}
    >
      <PrintIcon />
    </IconButton>
  );
};

export default PrintButton;
