# Hack Chat Bot

[![Neighborhood](https://files.catbox.moe/polh9e.png)](http://neighborhood.hackclub.com/)


## Setup

1.  **Create App from Manifest**:
    -   Go to [api.slack.com/apps](https://api.slack.com/apps) and click "Create New App".
    -   Select "From an app manifest".
    -   Choose your workspace, then paste the contents of `manifest.yaml` into the YAML editor and create the app.
2.  **Install & Get Credentials**:
    -   Install the app to your workspace.
    -   From the **Basic Information** page, get your **Signing Secret**.
    -   From the **OAuth & Permissions** page, get your **Bot User OAuth Token**.
3.  **Run the Bot**:
    -   Copy `.env.example` to `.env` and fill it with your credentials.
    -   You will also need a public URL for the Events API. For local development, you can use a tool like [zrok](https://zrok.io/) or [ngrok](https://ngrok.com/).
    -   Run the bot with `bun install` and `bun start`.
4.  **Add to Channel**:
    -   In your Slack channel, type `/invite @HackChat` to add the bot.

## What it does

-   Deletes any message that isn't a video.
-   Tells the user channel is only video!
-   Works with uploaded videos and video links (YouTube, TikTok etc)

Made with <3 By Deployor for [Neighboorhood](https://neighborhood.hackclub.com/) ([Hackclub](https://hackclub.com/))