import express, { NextFunction, Request, Response} from 'express';
import './database'

const PORT = process.env.PORT || 3300

const app = express();


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
