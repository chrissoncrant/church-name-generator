import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
//TODO: SETUP OPEN AI STUFF

const PORT = 5035;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({message: "Hello there!"});
})

app.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(200).send({
        message: 'Heree\'s the data we received: ',
        data: [data.idea1, data.idea2]
    })
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})

