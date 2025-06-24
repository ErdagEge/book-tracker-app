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
    fetch('https://book-tracker-app-0ncf.onrender.com/api/books', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error fetching stats:', err));
  }, []);

  // Compute stats here
  //const totalBooks = books.length;
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
        backgroundColor: '#5D9CEC',
      },
    ],
  };

  const chartDataPages = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Pages Read',
        data: monthLabels.map((month) => pagesPerMonth[month]),
        backgroundColor: '#4DC0B5',
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
      <h2>Your Reading Stats</h2>
      <div className="summary-cards">
        <div className="summary-card">📚 <strong>Total Books:</strong> {books.length}</div>
        <div className="summary-card">⭐ <strong>Avg. Rating:</strong> {avgRating}</div>
        <div className="summary-card">📖 <strong>Total Pages:</strong> {totalPages}</div>
        <div className="summary-card">🧮 <strong>Pages/Book:</strong> {avgPages}</div>
      </div>

      <div className="stats-grid">
        <div className="chart-card">
          <h3>Books Read Per Month</h3>
          <div className="chart-wrapper">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Total Pages Per Month</h3>
          <div className="chart-wrapper">
            <Bar data={chartDataPages} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
