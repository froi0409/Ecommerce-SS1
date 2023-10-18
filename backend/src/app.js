import express from 'express'
import * as db from './configs/database.config.js'

db.connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('backend');
})

export { app }

