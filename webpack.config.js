const slsw = require('serverless-webpack');

const { stage } = slsw.lib.options;

module.exports = {
  mode: stage === 'prod' ? 'production' : 'development',
  entry: slsw.lib.entries,
  target: 'node',
};
