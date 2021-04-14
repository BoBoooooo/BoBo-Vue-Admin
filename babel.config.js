module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-pro-crud',
        styleLibrary: {
          name: 'css',
          base: false,
        },
      },
    ],
  ],
};
