export const STATUS_BUTTON = 'button';
export const STATUS_LINK = 'link';
export const STATUS_EMBED = 'embed';

const youtube = {
  image: 'https://i.ytimg.com/vi/:key/sddefault.jpg',
  link: 'https://www.youtube.com/watch?v=:key',
  iframe: '<iframe src="https://www.youtube-nocookie.com/embed/:key?rel=0" allowFullScreen></iframe>',
  className: 'video-youtube',
};

const vimeo = {
  link: 'https://vimeo.com/:key',
  iframe: '<iframe src="https://player.vimeo.com/video/:key?dnt=true" allowfullscreen></iframe>',
  className: 'video-vimeo',
};

const patterns = [
  { re: /youtu.be\/([\w-]+)/, embed: youtube },
  { re: /youtube.*v=([\w-]+)/, embed: youtube },
  { re: /vimeo.com\/(\d+)/, embed: vimeo },
];

function getEmbed(embed, status) {
  if (!embed.image) {
    return embed.iframe;
  }
  const videoImage = `<img src="${embed.image}" class="video-preview" /><div data-link=${embed.link} class="video-overlay ${embed.className}"></div>`;
  switch (status) {
    case STATUS_BUTTON:
      return `<button className="video-image">${videoImage}</button>`;
    case STATUS_LINK:
      return `<a href="${embed.link}" target="_blank">${videoImage}</a>`;
    case STATUS_EMBED:
      return embed.iframe;
    default:
      return 'default';
  }
}

function embedVideo(html, status) {
  function findEmbed(link) {
    const pattern = patterns.find((pat) => pat.re.test(link));
    if (!pattern) {
      return link;
    }
    const match = link.match(pattern.re);
    const key = match[1];
    if (!key) {
      return link;
    }
    const embed = getEmbed(pattern.embed, status);
    return `<div class="embed-video">${embed.replace(/:key/g, key)}</div>`;
  }

  return html.replace(/<a[^>]+>.*?<\/a>/g, findEmbed);
}

export default embedVideo;
