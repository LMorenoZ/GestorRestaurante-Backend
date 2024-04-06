import express from 'express';
import indexRoutes from './routes/index.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import productosRoutes from './routes/productos.routes.js';
import pedidosRouter from './routes/pedidos.routes.js';

const app = express();

app.use(express.json());

app.use(indexRoutes);

app.use('/api/', usuariosRoutes);

app.use('/api/', productosRoutes);

app.use('/api/', pedidosRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'endpoint not found',
  });
});

export default app;
