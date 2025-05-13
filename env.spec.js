import dotenv from 'dotenv';
dotenv.config({ path: './.env.staging' });

export const username = process.env.USERNAME;
export const password = process.env.PASSWORD;
