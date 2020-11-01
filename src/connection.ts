import pgp from 'pg-promise';

const connection = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

const initOptions = {
  query(e: any) {
    console.log(e.query);
  }
};

const pgpInit = pgp(initOptions);
export const db = pgpInit(connection);
