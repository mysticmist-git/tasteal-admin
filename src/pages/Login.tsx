import { auth_auth } from '@/auth_firebase.config';
import { useSnackbarService } from '@/hooks';
import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import validator from 'email-validator';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const snackbarAlert = useSnackbarService();
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth_auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      // sign up with email password
      await signInWithEmailAndPassword(auth_auth, email, password);
      navigate('/users');
    } catch (error) {
      if (!(error instanceof FirebaseError)) {
        snackbarAlert('Đăng nhập thất bại', 'warning');
        return;
      }

      switch (error.code) {
        case 'auth/invalid-credential':
          snackbarAlert('Tài khoản không tồn tại!', 'warning');
          break;
      }
    }
  };

  const validate = () => {
    let valid = true;

    if (!validator.validate(email)) {
      valid = false;
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!password || password.length <= 6) {
      valid = false;
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    return valid;
  };

  if (loading) return <p>Đang lấy thông tin tài khoản</p>;

  if (user) return <Navigate to={'/'} replace />;

  return (
    <Box
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
      height="100vh"
    >
      <Card
        sx={{
          px: 8,
          py: 8,
        }}
        elevation={8}
      >
        <form action="" onSubmit={handleSubmit}>
          <Stack gap={1}>
            <Typography typography={'h4'}>Tasteal Admin</Typography>

            <TextField
              label="Email"
              variant="outlined"
              error={emailError}
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Mật khẩu"
              variant="outlined"
              type="password"
              helperText="Mật khẩu phải dài hơn 6 ký tự"
              error={passwordError}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" type="submit">
              Đăng nhập
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
};

export default Login;
