const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      // 'services': path.resolve(__dirname, 'src/shared/services'),
      // 'interfaces': path.resolve(__dirname, 'src/shared/interfaces')
      '@components': path.resolve(__dirname, 'src/components'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@enums': path.resolve(__dirname, 'src/enums'),
    },
  };

  return config;
};
