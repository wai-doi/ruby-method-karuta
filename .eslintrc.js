module.exports = {
  plugins: ['prettier', 'tailwindcss'],
  extends: ['react-app', 'plugin:tailwindcss/recommended', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
