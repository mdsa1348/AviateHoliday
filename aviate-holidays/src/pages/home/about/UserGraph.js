import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import "./UserGraph.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(response => {
        const users = response.data;
        if (!Array.isArray(users)) {
          console.error('Unexpected response format:', users);
          return;
        }
        const monthlyData = getMonthlyUserCount(users);
        setChartData({
          labels: Object.keys(monthlyData),
          datasets: [{
            label: 'Users Added Per Month',
            data: Object.values(monthlyData),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const getMonthlyUserCount = (users) => {
    const monthlyData = {};
    users.forEach(user => {
      const date = new Date(user.createdat);
      const month = date.toLocaleString('default', { year: 'numeric', month: 'short' });

      if (monthlyData[month]) {
        monthlyData[month] += 1;
      } else {
        monthlyData[month] = 1;
      }
    });
    return monthlyData;
  };

  return (
    <div className='UserGraphDiv' >
      <h2>User Signup Statistics</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default UserGraph;
