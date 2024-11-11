module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigations': './src/navigations',
          '@parts': './src/parts',
          '@screens': './src/screens',
          '@store': './src/store',
          '@slices': './src/store/slices',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@services': './src/utils/services',
        },
      },
    ],
    '@babel/plugin-transform-export-namespace-from',
    ['react-native-reanimated/plugin'],
    // ... other configs, if any
  ],
};
