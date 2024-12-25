import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number[]>([]);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);
  const [savedAmount, setSavedAmount] = useState<number>(0);

  // Calculate total expenses and remaining budget
  const totalExpenses = expenses.reduce((a, b) => a + b, 0);
  const remainingBudget = income - totalExpenses;

  // Add a new expense
  const handleAddExpense = () => {
    setExpenses([...expenses, expenseAmount]);
    setExpenseAmount(0);
  };

  // Add to savings
  const handleAddSavings = () => {
    if (remainingBudget >= 100) {
      setSavedAmount(savedAmount + 100);
    } else {
      alert("Not enough remaining budget to add to savings.");
    }
  };

  // Data for the Pie chart
  const data = {
    labels: ['Expenses', 'Remaining Budget', 'Savings'],
    datasets: [
      {
        data: [totalExpenses, remainingBudget, savedAmount],
        backgroundColor: ['#FF6384', '#36A2EB', '#4CAF50'],
      },
    ],
  };

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Financial Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Income Input */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Set Your Income</Typography>
              <TextField
                type="number"
                label="Income"
                variant="outlined"
                fullWidth
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                style={{ marginTop: '10px' }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Expense Input */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Add an Expense</Typography>
              <TextField
                type="number"
                label="Expense"
                variant="outlined"
                fullWidth
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(Number(e.target.value))}
                style={{ marginTop: '10px', marginBottom: '10px' }}
              />
              <Button variant="contained" color="secondary" onClick={handleAddExpense}>
                Add Expense
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Savings Goal */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Set a Savings Goal</Typography>
              <TextField
                type="number"
                label="Savings Goal"
                variant="outlined"
                fullWidth
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Number(e.target.value))}
                style={{ marginTop: '10px', marginBottom: '10px' }}
              />
              <Typography variant="body1">Saved: ${savedAmount} / ${savingsGoal}</Typography>
              <Button variant="contained" color="primary" onClick={handleAddSavings} style={{ marginTop: '10px' }}>
                Add $100 to Savings
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Budget Breakdown</Typography>
              <Pie data={data} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;