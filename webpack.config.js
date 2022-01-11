const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'LOTD: Link Evolution Card Finder',
      favicon: './src/assets/images/favicon.ico',
      meta: {
        description: {
          name: 'description',
          content:
            'An information rich card finder for Yu-Gi-Oh! Legacy of the Duelist: Link Evolution',
        },
        keyword: {
          name: 'keywords',
          content:
            'Yu-Gi-Oh, YuGiOh, LOTD, Legacy of the Duelist, Link Evolution',
        },
        'og:title': {
          property: 'og:title',
          content: 'LOTD: Link Evolution Card Finder',
        },
        'og:description': {
          property: 'og:description',
          content:
            'An information rich card finder for Yu-Gi-Oh! Legacy of the Duelist: Link Evolution',
        },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': {
          property: 'og:url',
          content:
            'https://cambuchi.github.io/LOTD-Link-Evolution-Card-Finder/',
        },
        'og:image': {
          property: 'og:image',
          content: './src/assets/images/og-image.png',
        },
        'twitter:card': {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        'twitter:title': {
          name: 'twitter:title',
          content: 'LOTD: Link Evolution Card Finder',
        },
        'twitter:description': {
          name: 'twitter:description',
          content:
            'An information rich card finder for Yu-Gi-Oh! Legacy of the Duelist: Link Evolution',
        },
        'twitter:image': {
          name: 'twitter:image',
          content: './src/assets/images/og-image.png',
        },
      },
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        //for importing css
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        //for importing images
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        //for importing fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
