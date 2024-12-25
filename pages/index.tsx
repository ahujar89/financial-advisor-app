import Link from 'next/link';
import { Typography, Container, Button } from '@mui/material';

const Home = () => {
  return (
    <Container style={{ textAlign: 'center', padding: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the AI-Powered Financial Advisor
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '20px' }}>
        Track your budget, spending, and savings goals with ease. Click below to explore the dashboard and take control of your finances.
      </Typography>
      <Link href="/dashboard">
        <Button variant="contained" color="primary">
          Go to Dashboard
        </Button>
      </Link>
    </Container>
  );
};

export default Home;