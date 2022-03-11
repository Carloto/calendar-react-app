import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { IUser, signInUser } from '../backend';

interface LoginPageProps {
  onSignIn: (user: IUser) => void;
}

function LoginPage({ onSignIn }: LoginPageProps) {
  const [email, setEmail] = useState('danilo@email.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    try {
      onSignIn(await signInUser(email, password));
    } catch (e) {
      setError('User not found');
    }
  }

  return (
    <Container maxWidth='sm'>
      <h2>React Calendar</h2>
      <p>Log in to see your calendar.</p>
      <form onSubmit={signIn}>
        <TextField
          margin='normal'
          label='E-mail'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          margin='normal'
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        {error && (
          <Box
            sx={{
              backgroundColor: 'rgb(253,236,234)',
              borderRadius: '4px',
              padding: '15px',
              margin: '15px 0',
            }}
          >
            {error}
          </Box>
        )}
        <Box textAlign={'right'} marginTop={'15px'}>
          <Button variant='contained' type='submit'>
            Sign in
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default LoginPage;
