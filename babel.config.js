module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['babel-plugin-module-resolver', {root: 'src'}],
    '@babel/plugin-transform-export-namespace-from',
  ],
}
