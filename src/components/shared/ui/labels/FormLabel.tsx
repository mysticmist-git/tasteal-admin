import { Typography, styled } from '@mui/material';

const FormLabel = styled(Typography)({
  fontSize: '16px',
  fontWeight: 800,
  marginBottom: 12,
  ':hover': {
    cursor: 'default',
  },
});

export { FormLabel };
