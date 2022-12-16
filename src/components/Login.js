import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import { login } from "../actions/auth";
import Button from '@mui/material/Button';
import logo from '../files/logo.png';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Alert, Snackbar, CircularProgress, CardContent, Card } from '@mui/material';
import { useForm } from 'react-hook-form';

export const Login = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmit = (data) => {

      setLoading(true);
        dispatch(login(data.email, data.password))
          .then(() => {
            navigate("/");
            window.location.reload();
          })
          .catch(() => {
            setLoading(false);
            setError(true);
          });
    };

    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }

    return(
      <div>
        {
          loading ?
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box> : <></>
        }


        <Container component="main" maxWidth="xs">
            {message && (
              <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
                <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
                  {message}
                </Alert>
              </Snackbar>
            )}
          <Card sx={{ maxWidth: 360, m: 2, marginTop: 15 }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                >
                <Box>
                  <img
                    src={logo}
                    alt="logo"
                    loading="lazy"
                    style={{maxSize: 'inherit', height:'65px'}}
                  />
                </Box>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    autoFocus
                    error = {!!errors.email}
                    helperText={errors.email && errors.email.type === 'required' ? 'El Correo es requerido' : errors.email && errors.email.type === 'pattern' ? 'El correo no tiene un formato valido' : ''}
                    /* eslint-disable no-useless-escape */
                    {...register("email",{ required: true, pattern: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}

                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    label="password"
                    error = {!!errors.password}
                    helperText={errors.password ? 'El password es requerido' : ''}
                    {...register("password", { required: true })}
                  />
                  <center>
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#000000' }} sx={{ mt: 3, mb: 2 }}>Login</Button>
                  </center>
                </Box>
              </Box>
            </CardContent>
        </Card>
      </Container>
    </div>
  )
}
