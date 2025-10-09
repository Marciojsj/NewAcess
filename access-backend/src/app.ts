import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { limiter } from './middlewares/rateLimiter.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';
import routes from './routes';
import logger from './utils/logger.util';

const app = express();

// Middlewares de segurança
app.use(helmet());

// CORS - Permitir múltiplas origens (desenvolvimento)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:19000',
  'http://localhost:19001',
  'http://localhost:19006',
  env.FRONTEND_URL,
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requisições sem origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
app.use(limiter);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Access Control API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users',
      entities: '/api/entities',
      visitors: '/api/visitors',
      access: '/api/access',
    },
  });
});

// Error handler (deve ser o último middleware)
app.use(errorHandler);

export default app;
