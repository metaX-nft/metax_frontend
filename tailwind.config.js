/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line import/no-extraneous-dependencies
import typography from '@tailwindcss/typography';

export const content = ['./src/**/*.tsx', './src/**/*.html'];

export const theme = {
  extend: {
  },
};

export const plugins = [typography];
