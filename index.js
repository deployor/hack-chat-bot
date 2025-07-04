const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const VIDEO_ONLY_CHANNEL = process.env.CHANNEL_ID;

function isVideoMessage(message) {
  if (message.files && message.files.length > 0) {
    const hasVideo = message.files.some(file => {
      if (file.mimetype && file.mimetype.startsWith('video/')) {
        return true;
      }
      
      if (file.name) {
        const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv', '.wmv', '.m4v', '.3gp', '.ogv', '.mpg', '.mpeg', '.m2v', '.asf'];
        const fileName = file.name.toLowerCase();
        return videoExtensions.some(ext => fileName.endsWith(ext));
      }
      
      if (file.filetype) {
        const videoTypes = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v', '3gp', 'ogv', 'mpg', 'mpeg', 'm2v', 'asf'];
        return videoTypes.includes(file.filetype.toLowerCase());
      }
      
      return false;
    });
    
    if (hasVideo) return true;
  }
  // To be honest, i asked AI for this regex ;_;
  if (message.text) {
    const videoUrlPatterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[a-zA-Z0-9_-]+/i,
      /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/[0-9]+/i,
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[^\/]+\/video\/[0-9]+/i,
      /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[a-zA-Z0-9_-]+/i,
      /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/[^\/]+\/status\/[0-9]+/i,
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[^\/]+\/videos\/[0-9]+/i,
      /(?:https?:\/\/)?(?:www\.)?(?:twitch\.tv|clips\.twitch\.tv)\/[a-zA-Z0-9_-]+/i,
      /https?:\/\/[^\s]+\.(mp4|mov|avi|mkv|webm|flv|wmv|m4v|3gp|ogv|mpg|mpeg|m2v|asf)/i
    ];

    return videoUrlPatterns.some(pattern => pattern.test(message.text));
  }

  return false;
}

app.event('message', async ({ event, client, context }) => {
  try {
    if (
      event.channel === VIDEO_ONLY_CHANNEL &&
      !event.subtype &&
      event.user !== context.botUserId
    ) {
      const userInfo = await client.users.info({
        user: event.user,
      });

      if (userInfo.ok && (userInfo.user.is_admin || userInfo.user.is_owner)) {
        return;
      }

      if (!isVideoMessage(event)) {
        // Commenting out message deletion for now
        // await client.chat.delete({
        //   channel: event.channel,
        //   ts: event.ts,
        // });

        const warningMessage = `:warn: <@${event.user}> This channel is video-only! 
Please only post videos (including in replies). Your message was deleted. :tv:`;

        await client.chat.postEphemeral({
          channel: event.channel,
          user: event.user,
          text: warningMessage,
          thread_ts: event.thread_ts,
          mrkdwn: true,
        });

        try {
          await client.chat.postMessage({
            channel: event.user,
            text: `Your message in <#${VIDEO_ONLY_CHANNEL}> was deleted because it wasn't a video.
:alert: The channel is video-only!
Both main messages and replies must be videos. Read pinned!`,
            mrkdwn: true,
          });
        } catch (dmError) {
          console.error('Failed to send DM to user:', dmError);
        }
      }
    }
  } catch (error) {
    console.error('Error with message:', error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Started up! :D Yay we good');
})();

// Made by @deployor deployor.dev :P