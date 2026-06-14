import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    project: 'TaskFlow Pro',
    message: 'API REST funcionando correctamente',
    endpoints: {
      tasks: '/api/tasks'
    }
  });
});

app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

export default app;
