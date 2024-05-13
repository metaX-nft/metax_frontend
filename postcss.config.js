module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*']
    }),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
