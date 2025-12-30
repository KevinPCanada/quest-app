import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables (so we can read DB_HOST, DB_USER, etc.)
dotenv.config();

export const pool = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'questapp',
    port: process.env.DB_PORT || 3306,
    // CRITICAL FOR TiDB: enable SSL. 
    ssl: process.env.DB_HOST === 'localhost' ? false : {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true // safer for production.
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection (Optional, but good for debugging logs)
pool.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

export default pool;