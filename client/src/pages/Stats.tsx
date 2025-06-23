import { useEffect, useState } from 'react';
import './Stats.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


interface Book {
  _id: string;
  title: string;
  rating?: number;
  pageCount?: number;
  startDate?: string;
  endDate?: string;
  // add pageCount if you store it
}

const Stats = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error fetching stats:', err));
  }, []);

  // Compute stats here
  const totalBooks = books.length;
  const avgRating = books.length
    ? (books.reduce((sum, b) => sum + (b.rating ?? 0), 0) / books.length).toFixed(2)
    : 'N/A';

  // Compute total pages
  const totalPages = books.reduce((sum, b) => sum + (b.pageCount ?? 0), 0);
  const avgPages = books.length
    ? (totalPages / books.length).toFixed(0)
    : 'N/A';

  // Compute books read per month
  const booksPerMonth: { [month: string]: number } = {};
  books.forEach((book) => {
    if (book.endDate) {
      const month = new Date(book.endDate).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      booksPerMonth[month] = (booksPerMonth[month] || 0) + 1;
    }
  });

  const pagesPerMonth: { [month: string]: number } = {};
  books.forEach((book) => {
    if (book.endDate) {
      const month = new Date(book.endDate).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      pagesPerMonth[month] = (pagesPerMonth[month] || 0) + (book.pageCount ?? 0);
    }
  });


  const monthLabels = Object.keys(booksPerMonth).sort((a, b) =>
    new Date(a).getTime() - new Date(b).getTime()
  );

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Books Read',
        data: monthLabels.map((month) => booksPerMonth[month]),
        backgroundColor: '#3498db',
      },
    ],
  };

  const chartDataPages = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Pages Read',
        data: monthLabels.map((month) => pagesPerMonth[month]),
        backgroundColor: '#2ecc71',
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  return (
    <div className="stats-container">
      <h2>📊 Your Reading Stats</h2>

      <div className="stat-cards">
        <div className="stat-card"><strong>Total Books:</strong> {totalBooks}</div>
        <div className="stat-card"><strong>Average Rating:</strong> {avgRating}</div>
        <div className="stat-card"><strong>Total Pages:</strong> {totalPages}</div>
        <div className="stat-card"><strong>Avg. Pages per Book:</strong> {avgPages}</div>
      </div>
      
      <div className="chart-container">
        <h3>Books Read per Month</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="chart-container">
        <h3>Pages Read per Month</h3>
        <Bar data={chartDataPages} options={chartOptions} />
      </div>
    </div>
  );
};

export default Stats;
