import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import * as axios from "axios";
import {TweetService} from "./services/tweet.service";

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:4200/',
    preflightContinue: false,
};

dotenv.config();

const app = express();
app.use(bodyParser.json())
app.use(cors());

let tweetService = new TweetService();

app.get("/tweets/:ticker", (req, res) => {
    tweetService.getTweetList(req.params.ticker).then(tweets => {
        res.status(200).json(tweets);
    });
})

app.listen(process.env.PORT, () => {
    return console.log(`server is listening on ${process.env.PORT}`);
});
