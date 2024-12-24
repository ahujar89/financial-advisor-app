import Link from 'next/link';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the AI-Powered Financial Advisor</h1>
      <p>Click below to explore the dashboard:</p>
      <Link href="/dashboard">
        Go to Dashboard
      </Link>
    </div>
  );
};
export default Home;