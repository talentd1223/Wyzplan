import * as React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useSetRecoilState} from "recoil";
import { Button, Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import { currentUser } from "../../store/Atoms";
import useStyles from "../../styles/LoginForm.style";
import axiosInstance from "../../utils/axiosApi";

const FormSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email'),
  password: Yup.string().required('Please enter your password')
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function LoginForm() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const setUser = useSetRecoilState(currentUser);

  const handleSubmit = async (values) => {
    try {
      // post form to retrieve access token
      const response = await axiosInstance.post('/token/', values);

      // set access token into axios headers
      axiosInstance.defaults.headers['x-access-token'] = `JWT ${response.data.access}`;

      // store tokens in local storage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      // get user profile
      const userResponse = await axiosInstance.get('/users/current_user');

      setUser(userResponse);
      setSuccess(true);
      window.location.href = '/';
    } catch (error) {
      console.log(error.stack);
      setErrorMessage(error.message);
    }
    return undefined;
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {/* eslint-disable-next-line no-unused-vars */}
        {({errors, touched}) => (
          <Form>
            <section className={classes.form}>
              <Card className={classes.card} variant="outlined">
                <Typography variant="h5" style={{ color: "black", fontWeight: 500, marginBottom: 24 }}>
                  Login to Wyzplan
                </Typography>
                <Field name='email'>
                  {({field, form: { setFieldValue }}) => (
                    <TextField
                      variant="outlined"
                      label="Email"
                      type="email"
                      name="email"
                      onChange={(event, newValue) => {
                        const nextValue = newValue || '';
                        setFieldValue('email', nextValue);
                      }}
                      error={errors.email && touched.email}
                      {...field}
                    />
                  )}
                </Field>
                <br />
                <br />
                <Field name='password'>
                  {({field, form: { setFieldValue }}) => (
                    <TextField
                      variant="outlined"
                      label="Password"
                      type="password"
                      name="password"
                      onChange={(event, newValue) => {
                        const nextValue = newValue || '';
                        setFieldValue('password', nextValue);
                      }}
                      error={errors.password && touched.password}
                      {...field}
                    />
                  )}
                </Field>
                <br />
                <br />
                <Button style={{ height: 50, marginBottom: 45 }} color="primary" type="submit" variant="contained">
                  Log In
                </Button>
              </Card>
            </section>
          </Form>
        )}
      </Formik>
      <Snackbar open={!!errorMessage} autoHideDuration={5000}>
        <MuiAlert elevation={6} variant="filled" severity="error">{errorMessage}</MuiAlert>
      </Snackbar>
    </div>
  );
}

export default LoginForm;
