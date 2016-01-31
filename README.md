# yodaify
Simple express server that can be used with a custom slack command to yodaify an input text using [this mashape API] (https://market.mashape.com/ismaelc/yoda-speak)

![alt text](https://github.com/nafetswirth/yodaify/blob/master/integration.png "Integration settings")

1. [Create a custom slack slash command for your team.](https://slack.com/apps/build)
2. Deploy the server - e.g on heroku 
3. Set your mashape key for env var ```YODA_API_KEY```
3. Insert the URL of your server
4. Write /yourSlashCommandName [msg] and get a yodaifyed response.
5. njoy

## Caveats

The API is running on a sandbox instance and sometimes down. </br>
Integration is sometimes timing out because slack has a max response time of 3000 ms.

## TODO

Change response handling so that no timeout occurs.
