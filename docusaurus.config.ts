import lightCodeTheme from 'prism-react-renderer/themes/github';
import darkCodeTheme from 'prism-react-renderer/themes/dracula';
import type {Config} from '@docusaurus/types';

const config = {
  title: 'headwindz',
  favicon: 'img/favicon.ico',
  url: 'https://headwindz.run',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'zh'],
  // },

  presets: [
    [
      'classic',
      ({
        // Enable docs plugin
        docs: {
          sidebarPath: './sidebars.js',
        },
        // Enable blog plugin
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    ({
      navbar: {
        title: 'headwindz',
        logo: {
          alt: 'headwindz',
          src: 'img/profile.jpeg',
        },
        items: [
          // Link to blogs
          {to: '/blog', label: 'Blogs', position: 'left'},
          // Link to Snippets
          {
            type: 'doc',
            position: 'left',
            label: 'Snippets',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/headwindz',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} headwindz.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
} satisfies Config;

export default config
