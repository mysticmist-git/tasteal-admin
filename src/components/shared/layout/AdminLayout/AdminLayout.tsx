import { auth_auth } from '@/auth_firebase.config';
import { PageRoute } from '@/lib/constants/common';
import { CalendarMonth, Category, Flatware, Home } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  SxProps,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { FC, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminListButton } from './components';

const commonStyle: SxProps = {
  height: '100vh',
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const checkSelected = (path: string) => {
    return location.pathname.includes(path);
  };

  const handleLogout = async () => {
    await signOut(auth_auth);
  };

  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button variant="contained" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2.5} sx={[commonStyle]}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Box component="nav">
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <Home color="primary" />
              </ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primaryTypographyProps={{
                  fontFamily: 'Dancing Script',
                  fontSize: 32,
                }}
                primary="Tasteal"
              />
            </ListItemButton>
          </Box>
        </Paper>
        <Paper
          elevation={4}
          sx={{ mt: 1, borderRadius: 4, overflow: 'hidden' }}
        >
          <Box>
            <AdminListButton
              Icon={Flatware}
              label="Nguyên liệu"
              path={PageRoute.Ingredients.Index}
              selected={checkSelected('ingredients')}
            />
            <AdminListButton
              Icon={Category}
              label="Loại nguyên liệu"
              path={PageRoute.IngredientTypes.Index}
              selected={checkSelected('ingredientTypes')}
            />
            <AdminListButton
              Icon={CalendarMonth}
              label="Dịp lễ"
              path={PageRoute.Occasions.Index}
              selected={checkSelected(`occasions`)}
            />
            <AdminListButton
              Icon={CalendarMonth}
              label="Người dùng"
              path={PageRoute.Users.Index}
              selected={checkSelected(`users`)}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={9.5} sx={[commonStyle]}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
          }}
        >
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export { AdminLayout };
