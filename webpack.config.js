const path = require('path');

module.exports = {
  mode: 'development',

  // entry: [
  //   path.join(__dirname, './src/index.js'),
  // ],
  entry: {
    app: [
      './src/index.js'
    ],
    other: [
      './src/other.js'
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    open: true,
    port: 8080,
  },

  module: {
    rules: [
      {
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
      },
      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              inline: 'fallback',
            },
          },
        ]
      },
      {
      test: /.(scss|css)$/,

      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",

        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",

        options: {
          sourceMap: true
        }
      }]
    }]
  },
}