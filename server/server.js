import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi} from 'openai';

const PORT = 5035;

dotenv.config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({message: "Hello there!"});
})

app.post('/', async (req, res) => {
    console.log('Fetch received!');

    try {
        const data = req.body;

        console.log('data', data);

        const prompt = `Generate a JavaScript array of 7 church names. Each name in the array is up to four words in length. Each name is related to the themes of "${data.idea1}" and "${data.idea2}". Additionally, all names must be related to the Bible. Do not include the word 'church' or 'tabernacle' in the name.`

        // console.log('prompt', prompt);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })

        console.log(response.data.choices[0].text);

        res.status(200).send({
            ideas: response.data.choices[0].text
        })
        
        // res.status(200).send({
        //     prompt
        // })
    } catch (error) {
        res.status(500).send({ error });
    }
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})

