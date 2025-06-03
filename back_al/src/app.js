import express from 'express';
import { getVacanciesRouter } from './routres/vacancies-router.js';
import cors from 'cors';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/vacancies', getVacanciesRouter());

// Статичні файли
const distPath = path.join(__dirname, '..', 'public', 'build');
app.use(express.static(distPath));

// Віддача index.html для SPA
app.get('{*any}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Експортуємо додаток для Vercel
export default app;