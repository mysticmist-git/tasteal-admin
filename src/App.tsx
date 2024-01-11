import ProtectedRoute from '@/components/features/auth/ProtectedRoute';
import { AdminLayout } from '@/components/shared/layout';
import Login from '@/pages/Login';
import AdminIngredientTypesCreate from '@/pages/ingredientTypes/AdminIngredientTypesCreate';
import { AdminIngredientTypesIndex } from '@/pages/ingredientTypes/AdminIngredientTypesIndex';
import AdminIngredientCreate from '@/pages/ingredients/AdminIngredientsCreate';
import { AdminIngredientsIndex } from '@/pages/ingredients/AdminIngredientsIndex';
import AdminOccasionsCreate from '@/pages/occasions/AdminOccasionsCreate';
import { AdminOccasionsIndex } from '@/pages/occasions/AdminOccasionsIndex';
import { AdminRecipesIndex } from '@/pages/recipes/AdminRecipesIndex';
import { SnackbarProvider } from '@/provider/SnackbarProvider';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminUsersIndex from './pages/users/AdminUsersIndex';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <Navigate to="/users" />
                      </ProtectedRoute>
                    }
                  />

                  <Route path={'/recipes'}>
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminRecipesIndex />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":id"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="create"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":id/edit"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route path={'/ingredients'}>
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientsIndex />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":id"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="create"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":id/edit"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route path={'/ingredient-types'}>
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientTypesIndex />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":id"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientTypesCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="create"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientTypesCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":id/edit"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminIngredientTypesCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route path={'/occasions'}>
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminOccasionsIndex />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":id"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminOccasionsCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="create"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminOccasionsCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":id/edit"
                      element={
                        <ProtectedRoute>
                          <AdminLayout>
                            <AdminOccasionsCreate />
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <AdminLayout>
                          <AdminUsersIndex />
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  ></Route>

                  <Route
                    path="/comments"
                    element={
                      <ProtectedRoute>
                        <AdminLayout>
                          <>Bình luận</>
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  ></Route>
                </Route>
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </SnackbarProvider>
        </LocalizationProvider>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
