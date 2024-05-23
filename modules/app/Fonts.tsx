import { Global } from '@emotion/react';

export const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Londrina Solid';
      src: url(/fonts/Londrina_Solid/LondrinaSolid-Black.ttf);
      src: url(/fonts/Londrina_Solid/LondrinaSolid-Regular.ttf);
    }
    :root {
      --gap: 16pt;
      --page-background-color: white;
      --alt-background-color: grey;
      --text-main-color: #212529;
      --text-secondary-color: grey;
      --alt-text-main-color: green;
      --alt-text-secondary-color: grey;

      --z-index-header: 100;
      --accents-1: #f9fafc;
      --accents-2: #eaeaea;
      --accents-3: #999;
      --accents-4: #888;
      --accents-5: #666;
      --accents-6: #444;
      --accents-7: #333;
      --accents-8: #111;

      --background-color: #d63c5d13;
      --nounsdao-color: #e1d7d5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    }

    body {
      padding: 0;
      margin: 0;
      margin: 0;
      padding: 0;
      font-size: 15px;
      font-weight: 400;
      line-height: 1.8;
      color: var(--text-main-color);
      background: var(--page-background-color);
    }
      `}
  />
);
