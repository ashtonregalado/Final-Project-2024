//db.ts

// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables

// // Create a new pool instance
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// pool.on('error', (err) => {
//   console.error('Error with PostgreSQL connection', err);
// });

// export default pool;

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:VillarAshton@localhost:5432/GeniuShare-Database',
});

pool.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Connected to the database!');
  }
});

export default pool;
