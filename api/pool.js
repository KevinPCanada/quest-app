import { createPool } from "mysql2/promise"

export const pool = createPool ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'questapp'
})

// Test the pool connection
pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

export default pool;