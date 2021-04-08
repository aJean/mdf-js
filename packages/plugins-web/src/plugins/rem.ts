/**
 * @file 集成 rem
 */

let DESIGN_WIDTH: number;
let REM_BASE: number;
let MAX_WIDTH: number;
let inited = false;

export function beforeRender(config: any) {
  const { rootValue, designWidth, maxWidth } = config.rem;
  const style = document.createElement('style');

  initRem({ rootValue, maxWidth, designWidth });
  // 最大宽度约束
  style.innerHTML = `
    @media screen and (min-width: ${maxWidth}px) {
      #root {
        width: ${maxWidth}px;
        margin: 0 auto;
      }
    }
  `;
  document.head.append(style);
}

/**
 * 根据屏幕变化修改 fontsize
 */
function auto() {
  // REM_BASE 与 pxtorem 一致，保证屏幕相同像素与设计图尺寸相同
  const fontSize = ((Math.min(window.innerWidth, MAX_WIDTH) / DESIGN_WIDTH) * REM_BASE).toFixed(1);
  document.documentElement.style.fontSize = fontSize + 'px';
}

function initRem({ designWidth = 750, maxWidth = 900, rootValue = 100 }) {
  DESIGN_WIDTH = designWidth;
  MAX_WIDTH = maxWidth;
  REM_BASE = rootValue;
  auto();
  inited = true;
}

window.addEventListener('resize', () => {
  if (!inited) return;
  auto();
});
