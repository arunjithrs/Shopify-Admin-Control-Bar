const { parsed: localEnv } = require("dotenv").config();

const webpack = require("webpack");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const server = JSON.stringify(process.env.HOST);
const appName = JSON.stringify(process.env.APP_ABS_NAME);

module.exports = {
  webpack: (config) => {
    const env = { API_KEY: apiKey, SERVER: server, APP_NAME: appName };
    config.plugins.push(new webpack.DefinePlugin(env));

    // Add ESM support for .mjs files in webpack 4
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};
