/** @type {import('tailwindcss').Config} */

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

// eslint-disable-next-line import/no-extraneous-dependencies
import typography from '@tailwindcss/typography';

export const content = ['./src/**/*.tsx', './src/**/*.html'];

export const theme = {
  extend: {
    colors: {
      highlight: withOpacityValue('--color-highlight'),
      primary: withOpacityValue('--color-primary'),
      'bd-main': '#434357',
      success: withOpacityValue('--color-success'),
      warn: withOpacityValue('--color-warn'),
      danger: withOpacityValue('--color-danger'),
      'gradient-to': withOpacityValue('--color-gradient-to'),
      'gradient-from': withOpacityValue('--color-gradient-from '),
    },
    backgroundColor: {
      main: withOpacityValue('--color-bg-main'),
      muted: withOpacityValue('--color-bg-muted'),
      invert: withOpacityValue('--color-bg-invert'),
    },
    spacing: {
      view: 'var(--max-width)',
      view2: 'var(--max-width2)',
      view3: 'var(--max-width3)',
    },
  },
};

export const plugins = [typography];
