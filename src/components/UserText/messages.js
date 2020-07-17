/*
 * UserText Messages
 *
 * This contains all the text for the UserText component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.UserText.header',
    defaultMessage: 'Cookies for YouTube Videos',
  },
  explain: {
    id: 'app.components.UserText.explain',
    defaultMessage: 'In order to play embedded videos on this site, YouTube will places cookies on your computer. Do you agree that these cookies are placed?',
  },
  embed: {
    id: 'app.components.UserText.embed',
    defaultMessage: 'Yes. Videos from YouTube will be played on this site when you click on them.',
  },
  link: {
    id: 'app.components.UserText.link',
    defaultMessage: 'No. When you click on a video image, the video will be opened on YouTube in a separate tab or window.',
  },
});
