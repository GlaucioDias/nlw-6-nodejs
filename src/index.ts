import express, { NextFunction, Request, Response} from 'express';


const PORT = process.env.PORT || 3300

const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Ola NLW'})
})

app.post('/test-post', (req, res) => {
    return res.status(200).json({ message: 'test-post'})
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
