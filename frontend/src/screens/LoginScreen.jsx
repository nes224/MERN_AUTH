import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from "../slices/authSlice";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";

// useDispatch obviously that's to dispatch an action 
// and useSelector is to select from your global state

const LoginScreen = () => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    console.log('isLoading',isLoading);
    const { userInfo } = useSelector((state) => state.auth);
    // if there is user info that means we're logged in so I want to redirect to the home page,
    //  if we're logged in and we go to the login scr een.
    // for that we'll do a use useEffect.

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]); // we do have to add those as dependencies to our use effect

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap(); // .unwrap because this will return a promise so what this basically does is it unwraps that promise.
            console.log('res',res);
            dispatch(setCredentials({...res}));
            navigate('/')
        } catch(err) {
            toast.error(err?.data?.message || err.error);
        }
    }

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        { isLoading && <Loader />}        

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'
        >
          Sign In
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
