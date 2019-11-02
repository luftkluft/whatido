export const secondsFormater = (seconds) => {
  let s = seconds%60;
  if (s < 10) s = '0' + s;
  let m = Math.floor((seconds%3600)/60);
  if (m < 10) m = '0' + m;
  let h = Math.floor((seconds%86400)/3600);
  if (h < 10) h = '0' + h;
  let d = Math.floor((seconds%2592000)/86400);
  if (d < 10) d = '0' + d;
  return `${d} ${h}:${m}:${s}`
}