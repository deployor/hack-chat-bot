# Hack Chat Bot

[![Neighborhood](https://files.catbox.moe/polh9e.png)](http://neighborhood.hackclub.com/)


## Setup

1.  **Create a Slack App** at [api.slack.com/apps](https://api.slack.com/apps).
2.  **Add Permissions**:
    -   `channels:history`
    -   `channels:read`
    -   `chat:write`
    -   `im:write`
3.  **Enable Events API**:
    -   Go to **Event Subscriptions** and turn it on.
    -   For the **Request URL**, you'll need a public URL. For local development, you can use a tool like [zrok](https://zrok.io/). Run `zrok http 3000`
    -   Subscribe to the `message.channels` bot event.
    - Set the url to beans.beans/slack/events in env.
4.  **Environment**:
    -   Copy `.env.example` to `.env` and fill in your `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET`.
    - Set the url to beans.beans/slack/events in env.
5.  **Run**:
    ```bash
    bun install
    bun start
    ```
6. **Add to channel**
   - Ping the bot or use /invite and confirm to add the bot to the channel!

## What it does

-   Deletes any message that isn't a video.
-   Tells the user channel is only video!
-   Works with uploaded videos and video links (YouTube, TikTok etc)

Made with <3 By Deployor for [Neighboorhood](https://neighborhood.hackclub.com/) ([Hackclub](https://hackclub.com/))