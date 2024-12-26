import React, { useState, useEffect } from 'react';
import { TableContainer } from '@mui/material';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Box,
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import Papa from 'papaparse';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpenseIcon from '@mui/icons-material/RemoveShoppingCart';
import BudgetIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/TrendingUp';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const categories = ['Food', 'Rent', 'Travel', 'Utilities', 'Other'];

  const [income, setIncome] = useState<number>(12000);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [savedAmount, setSavedAmount] = useState<number>(500);
  const [savingsGoal] = useState<number>(4500);

  useEffect(() => {
    const dummyCSV = `
Date,Category,Amount
2024-12-01,Food,50
2024-12-02,Rent,1000
2024-12-03,Travel,200
2024-12-04,Utilities,150
2024-12-05,Food,60
2024-12-06,Other,300
2024-12-07,Travel,400
2024-12-08,Food,45
2024-12-09,Rent,1000
2024-12-10,Utilities,120
    `;
    const parsed = Papa.parse(dummyCSV.trim(), { header: true });
    setTransactions(parsed.data);
  }, []);

  const totalExpenses = transactions.reduce((sum, transaction) => sum + parseFloat(transaction.Amount), 0);
  const remainingBudget = income - totalExpenses;

  // Chart Data
  const categoryTotals = categories.map((category) => ({
    category,
    total: transactions
      .filter((transaction) => transaction.Category === category)
      .reduce((sum, transaction) => sum + parseFloat(transaction.Amount), 0),
  }));

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals.map((entry) => entry.total),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5722'],
      },
    ],
  };

  const trendData = transactions.map((transaction) => ({
    date: transaction.Date,
    amount: parseFloat(transaction.Amount),
  }));

  const categoryData = categoryTotals.map((entry) => ({
    category: entry.category,
    total: entry.total,
  }));

  const generateAdvice = () => {
    const advice = [];
    const highestCategory = categoryTotals.reduce(
      (prev, curr) => (curr.total > prev.total ? curr : prev),
      { category: '', total: 0 }
    );

    if (totalExpenses > income) {
      advice.push({ message: "You're spending more than your income! Reduce discretionary expenses.", icon: <ExpenseIcon />, color: '#fbe9e7' });
    } else if (remainingBudget > income * 0.2) {
      advice.push({ message: "Great job! You have more than 20% of your income left. Consider saving or investing.", icon: <SavingsIcon />, color: '#e8f5e9' });
    } else {
      advice.push({ message: "Aim to save at least 20% of your income for better financial health.", icon: <SavingsIcon />, color: '#fff3e0' });
    }

    if (highestCategory.total > income * 0.3) {
      advice.push({ message: `Your highest spending category is "${highestCategory.category}". Consider reducing expenses here.`, icon: <ExpenseIcon />, color: '#ffe0b2' });
    }

    if (savedAmount < savingsGoal) {
      advice.push({ message: `You're $${savingsGoal - savedAmount} away from your savings goal. Allocate more to savings.`, icon: <SavingsIcon />, color: '#e1f5fe' });
    }

    return advice;
  };

  const TransactionsTable = ({ transactions }: { transactions: any[] }) => (
    <TableContainer>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: parseFloat(transaction.Amount) > 500 ? '#ffe6e6' : 'white',
              }}
            >
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{transaction.Date}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{transaction.Category}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>${parseFloat(transaction.Amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );

  return (
    <div>
      <AppBar position="static" style={{ marginBottom: '20px' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Financial Advisor Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>
          Financial Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Overview Section */}
          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#e3f2fd' }}>
              <CardContent>
                <AttachMoneyIcon fontSize="large" />
                <Typography variant="h6">Total Income</Typography>
                <Typography variant="h5">${income.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#fbe9e7' }}>
              <CardContent>
                <ExpenseIcon fontSize="large" />
                <Typography variant="h6">Total Expenses</Typography>
                <Typography variant="h5">${totalExpenses.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <BudgetIcon fontSize="large" />
                <Typography variant="h6">Remaining Budget</Typography>
                <Typography variant="h5">${remainingBudget.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Visualizations */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Spending by Category</Typography>
                <Pie data={pieData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Monthly Spending Trends</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Spending by Category (Bar Chart)</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="total" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Financial Advice Section */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Personalized Financial Advice
            </Typography>
            <Grid container spacing={3}>
              {generateAdvice().map((advice, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card style={{ backgroundColor: advice.color }}>
                    <CardContent>
                      {advice.icon}
                      <Typography variant="body1" style={{ marginTop: '10px' }}>
                        {advice.message}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Transactions Table */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Recent Transactions</Typography>
                <TransactionsTable transactions={transactions} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Box component="footer" style={{ textAlign: 'center', padding: '20px', marginTop: '40px', backgroundColor: '#f8f9fa' }}>
        <Typography variant="body2">© 2024 Financial Advisor. All rights reserved.</Typography>
      </Box>
    </div>
  );
};

export default Dashboard;