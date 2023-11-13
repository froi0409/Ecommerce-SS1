import express from 'express'
import cors from 'cors';
import path from 'path';
import * as db from './configs/database.config.js'

import { ProductsRoutes } from './routes/products.routes.js';
import { UsersRoutes } from './routes/users.routes.js';
import { SupplierRoutes } from './routes/suppliers.routes.js';
import { CategoriesRoutes } from './routes/categories.routes.js';
import { SalesRoutes } from './routes/sales.routes.js';

db.connectDB();

const app = express();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const corsOptions = {};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('backend');
});

app.use('/api', ProductsRoutes);
app.use('/api', UsersRoutes);
app.use('/api', SupplierRoutes);
app.use('/api', CategoriesRoutes);
app.use('/api', SalesRoutes); 

export { app }

