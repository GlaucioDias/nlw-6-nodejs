import express from 'express';
import { router } from './routes';
import './database'

const PORT = process.env.PORT || 3300

const app = express();

app.use(express.json())

app.use(router)


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
