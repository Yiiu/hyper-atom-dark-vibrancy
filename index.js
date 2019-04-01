

exports.decorateConfig = config => {
  const backgroundColor = config.enableVibrancy ? 'rgba(40, 44, 52, 0.7)' : '#282c34';
  const foregroundColor = '#abb2bf'
  const cursorColor = config.enableVibrancy ? 'transparent' : foregroundColor;
  const borderColor = config.enableVibrancy ? 'transparent' : backgroundColor;
  const tabColor = config.enableVibrancy ? 'rgba(40, 44, 52, 0.23)' : 'rgba(0, 0, 0, 0.19)';
  const tabBorderColor = config.enableVibrancy ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.3)';
  
  const colors = {
    black       : backgroundColor,
    red         : '#e06c75', // red
    green       : '#98c379', // green
    yellow      : '#d19a66', // yellow
    blue        : '#56b6c2', // blue
    magenta     : '#c678dd', // pink
    cyan        : '#56b6c2', // cyan
    white       : '#d0d0d0', // light gray
    lightBlack  : '#808080', // medium gray
    lightRed    : '#e06c75', // red
    lightGreen  : '#98c379', // green
    lightYellow : '#d19a66', // yellow
    lightBlue   : '#56b6c2', // blue
    lightMagenta: '#c678dd', // pink
    lightCyan   : '#56b6c2', // cyan
    colorCubes  : '#ffffff', // white
    grayscale   : foregroundColor
  }
  if (process.platform === 'darwin') {
    tabListStyles = `
      .tabs_list {
        margin-left: 0 !important;
        padding-left: 76px;
      }
      .tabs_list::before {
        content: "";
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        bottom: 0;
        width: 76px;
        background-color: ${tabColor} !important;
        border-bottom: 1px solid ${tabBorderColor};
      }
    `;
  }
  const decoratedConfig = Object.assign({}, config, {
    foregroundColor,
    backgroundColor,
    borderColor,
    cursorColor,
    colors,
    termCSS: `
      ${config.termCSS || ''}
      .cursor-node {
        mix-blend-mode: difference;
        border-left-width: 2px;
      }
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #3c424e;
      }
    `,
    css: `
      ${config.css || ''}
      .hyper_main {
        background-color: ${backgroundColor};
      }
      .header_header {
        top: 0;
        right: 0;
        left: 0;
      }
      .tabs_list {
        border-bottom-color: ${tabBorderColor} !important;
      }
      .tabs_list::before {
        content: "";
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        bottom: 0;
        width: 76px;
        background-color: rgba(50, 50, 50, .09) !important;
        border-bottom: 1px solid ${tabBorderColor};
      }
      .splitpane_divider {
        background-color: rgba(171, 178, 191, 0.15) !important;
      }
      ${tabListStyles}
      .tab_tab {
        font-weight: 500;
        color: rgba(157, 165, 180, 0.6);
        border-color: ${tabBorderColor} !important;
        background-color: ${tabColor} !important;
      }
      .tab_tab:hover {
        color: rgba(157, 165, 180, 0.6);
        transition: none;
      }
      .tab_tab::after {
        content: "";
        position: absolute;
        pointer-events: none;
        top: 0;
        bottom: -1px;
        left: 0;
        width: 2px;
        height: inherit;
        background: #528bff;
        opacity: 0;
        transition: opacity .16s;
        z-index: 1;
      }
      .tabs_title,
      .tab_tab.tab_active {
        font-weight: 500;
        color: #d7dae0;
      }
      .tab_tab.tab_active {
        background-color: transparent !important;
      }
      .tab_tab.tab_active::after {
        opacity: 1;
        transition-duration: .32s;
      }
      .tab_icon {
        display: block;
        background: rgba(157, 165, 180, 0.6);
        -webkit-mask-image: url('${__dirname}/close.svg');
        mask-image: url('${__dirname}/close.svg');
        -webkit-mask-size: 7px;
        mask-size: 7px;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position-y: center;
        mask-position-y: center;
        -webkit-mask-position-x: 8px;
        mask-position-x: 8px;
        width: 26px;
        height: 100%;
        top: 0;
        right: 0;
        transform: scale(0);
        transition: transform .08s;
        opacity: 1;
        border-radius: 0;
        z-index: 2;
      }
      .tab_icon:hover {
        background: rgba(157, 165, 180, 0.6);
        opacity: .7;
      }
      .tab_tab.tab_active .tab_icon {
        background: #d7dae0;
      }
      .tab_tab.tab_active .tab_icon:hover {
        background: #d7dae0;
      }
      .tab_tab:hover .tab_icon {
        transform: scale(1);
        transition-duration: .16s;
      }
      .tab_icon svg {
        display: none;
      }
      .tab_icon::after {
        display: none;
      }
      .footer_footer {
        transparent !important;
      }
      .footer_footer .group_overflow {
        font-size: 14px;
      }
    `
  })
  exports.onWindow = browserWindow => {
    if (config.enableVibrancy === true) {
      browserWindow.setVibrancy('dark');
    }
  };
  return decoratedConfig;
}