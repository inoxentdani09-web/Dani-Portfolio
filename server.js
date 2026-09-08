import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { APP_CONFIG } from './src/config/constants.js';
import homeRoutes from './src/routes/homeRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = APP_CONFIG.port;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Core Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Static Assets
app.use('/Images', express.static(path.join(__dirname, 'wwwroot', 'Images')));
app.use('/images', express.static(path.join(__dirname, 'wwwroot', 'Images')));
app.use('/css', express.static(path.join(__dirname, 'wwwroot', 'css')));
app.use('/js', express.static(path.join(__dirname, 'wwwroot', 'js')));
app.use('/lib', express.static(path.join(__dirname, 'wwwroot', 'lib')));
app.use(express.static(path.join(__dirname, 'wwwroot')));

// Application Routes
app.use('/', homeRoutes);
app.use('/', adminRoutes);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).render('admin/login', {
    error: '404 - The requested page could not be found.',
    email: 'admin@gmail.com',
    password: ''
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(500).send('Internal Server Error: ' + err.message);
});

// Start Server on 0.0.0.0:3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Daniyal Portfolio Full-Stack Application running on http://0.0.0.0:${PORT}`);
});
