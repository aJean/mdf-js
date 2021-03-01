/**
 * @file 集成 rem
 */

export function beforeRender(config: any) {
  const { rootValue, designWidth, maxRatio } = config.rem;
  
  initRem({ rootValue, maxRatio, designWidth });

  const style = document.createElement('style');
  style.innerHTML = `
    @media screen and (min-width: ${designWidth * maxRatio}px) {
      #root {
        width: ${designWidth * maxRatio}px;
        margin: 0 auto;
      }
    }
  `;

  document.head.append(style);
}


let DESIGN_WIDTH = 375;
let REM_BASE = 100;
let MAX_RATIO = 2;
let fontSize = 100;
let inited = false;

const hander = () => {
  const fontSize = ((Math.min(window.innerWidth, MAX_RATIO * 375) / DESIGN_WIDTH) * REM_BASE).toFixed(1);

  document.documentElement.style.fontSize = fontSize + 'px';
};

window.addEventListener('resize', () => {
  if (!inited) return;
  hander();
});

const px2Rem = (px: any, addUnit = false) => {
  let value: any = px / REM_BASE;

  if (addUnit) {
    value += 'rem';
  }

  return value;
};

const rem2Px = (rem: any, addUnit = false) => {
  let value: any = REM_BASE * rem;

  if (addUnit) {
    value += 'px';
  }

  return value;
};

const initRem = ({ designWidth = 375, rootValue = 100, maxRatio = 2 }) => {
  DESIGN_WIDTH = designWidth;
  REM_BASE = rootValue;
  MAX_RATIO = maxRatio;
  hander();
  inited = true;
};