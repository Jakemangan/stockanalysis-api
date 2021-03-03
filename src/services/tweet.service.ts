//&include_entities=false&tweet_mode=extended';
import * as axios from "axios";

export class TweetService {
    private url = 'https://api.twitter.com/2/tweets/search/recent';
    private extraQuery = '&max_results=100&expansions=author_id&user.fields=username&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,referenced_tweets,reply_settings,source,text,withheld'
    private bearerToken = process.env.twitterBearerToken;
    private headers = {
        Authorization: "Bearer " + this.bearerToken
    }

    public async getTweetList(ticker: string){
        let query = `?query=(%23${ticker})`
        query += this.extraQuery;

        let res = await axios.default.get(this.url + query, {
            headers: this.headers
        });

        let tweets: string[] = [];
        res.data.data.forEach(tweet => {
            tweets.push(tweet.text);
            // ids.push(tweet.id);
        });
        return tweets;
    }
}





