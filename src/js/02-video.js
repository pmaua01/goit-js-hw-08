import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const onPlay = function ({ seconds }) {
  console.log(seconds);
  const save = seconds;
  localStorage.setItem('videoplayer-current-time', save);
};
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 500));

console.log(localStorage.getItem('videoplayer-current-time'));

const currentTime = localStorage.getItem('videoplayer-current-time');
console.log('on current time', currentTime);

if (currentTime) {
  player.setCurrentTime(currentTime);
}
