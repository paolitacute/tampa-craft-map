import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config

const config = {
  user: 'little_tampa_treasures_database_user',
  password: 'btmjRau3KL5IGFCdiG8pc9tSIr9YWjkg',
  host: 'dpg-dasq1959fdbs73ei4bh0-a.oregon-postgres.render.com', // Use YOUR external Render URL here
  port: 5432,
  database: 'little_tampa_treasures_database',
  ssl: { rejectUnauthorized: false }
};

export const pool = new pg.Pool(config)