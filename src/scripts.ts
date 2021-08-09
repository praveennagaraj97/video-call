export const fontAwesomeTag = () => {
  const tag = document.createElement('link');

  tag.href =
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';

  tag.rel = 'stylesheet';
  tag.integrity =
    'sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==';
  tag.crossOrigin = 'anonymous';
  tag.referrerPolicy = 'no-referrer';

  document.head.appendChild(tag);
};
