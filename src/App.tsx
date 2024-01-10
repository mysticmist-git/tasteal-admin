import ProtectedRoute from '@/components/features/auth/ProtectedRoute';
import { AdminLayout } from '@/components/shared/layout';
import Login from '@/pages/Login';
import { AdminIngredientsIndex } from '@/pages/ingredients/AdminIngredientsIndex';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/users" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ingredients"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminIngredientsIndex />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <>Người dùng</>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </CssBaseline>
  );
};

export default App;
