import { IApi } from '@mdfjs/types';

/**
 * @file 集成 growing io
 */

export default function (api: IApi, data: any) {
  const gioscript = `<script>!function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","assets.giocdn.com/gio-wxwv.js","gio");gio('init', '${data.key}', '', { debug: ${data.debug},hashtag: ${data.hashtag} });gio('send');</script>`;

  api.chainWebpack((chain) => {
    chain.plugin('htmlPlugin').tap((opts: any) => {
      const config = opts[0];

      if (config) {
        // @warning 这个变量不要直接覆盖！！！
        config.templateParameters['MDF_SCRIPT'] += gioscript;
      }

      return opts;
    });
  });
}
