import { auth_auth } from '@/auth_firebase.config';
import { PageRoute } from '@/lib/constants/common';
import {
  CalendarMonth,
  Category,
  Flatware,
  Home,
  InsertCommentRounded,
  PeopleAltRounded,
  RamenDining,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
    <Grid container spacing={3} sx={{ p: 4 }}>
      <Grid item xs={12}>
        <Card
          sx={{
            borderRadius: 4,
            p: 3,
            textAlign: 'right',
          }}
        >
          <Button variant="contained" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Card>
      </Grid>

      <Grid item xs={2.5} sx={[commonStyle]}>
        <Card
          sx={{
            borderRadius: 4,
          }}
        >
          <Box component="nav">
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <Home color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'h6',
                }}
                primary="Tasteal"
              />
            </ListItemButton>
          </Box>
        </Card>

        <Card sx={{ mt: 2, borderRadius: 4 }}>
          <Box
            sx={{
              py: 2,
            }}
          >
            <AdminListButton
              Icon={RamenDining}
              label="Công thức"
              path={PageRoute.Recipes.Index}
              selected={checkSelected('recipes')}
            />
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
              selected={checkSelected('ingredient-types')}
            />
            <AdminListButton
              Icon={CalendarMonth}
              label="Dịp lễ"
              path={PageRoute.Occasions.Index}
              selected={checkSelected(`occasions`)}
            />
            <AdminListButton
              Icon={PeopleAltRounded}
              label="Người dùng"
              path={PageRoute.Users.Index}
              selected={checkSelected(`users`)}
            />

            <AdminListButton
              Icon={InsertCommentRounded}
              label="Bình luận"
              path={PageRoute.Comments.Index}
              selected={checkSelected(`comments`)}
            />
          </Box>
        </Card>
      </Grid>

      <Grid item xs={9.5} sx={[commonStyle]}>
        <Card
          sx={{
            borderRadius: 4,
          }}
        >
          {children}
        </Card>
      </Grid>
    </Grid>
  );
};

export { AdminLayout };
