function parseColor(colorName) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(--${colorName}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(--${colorName}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(--${colorName}))`;
  };
}

module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-rtl')
  ],

  theme: {
    extend: {
      screens: {
        'xs': '475px'
      },
      colors: {
        page: parseColor('pos-color-page'),
        panel: {
          DEFAULT: parseColor('pos-color-panel'),
          highlight: parseColor('pos-color-panel-highlight'),
        },
        frame: parseColor('pos-color-frame'),
        logo: parseColor('pos-color-logo'),
        accent: {
          dark: parseColor('pos-color-accent-dark'),
        },
        pageheader: {
          from: parseColor('pos-color-pageheader-from'),
          to: parseColor('pos-color-pageheader-to'),
        },
        content: {
          DEFAULT: parseColor('pos-color-content'),
          inverted: parseColor('pos-color-content-inverted'),
          sidenote: parseColor('pos-color-content-sidenote'),
        },
        interaction: {
          DEFAULT: parseColor('pos-color-interaction'),
          hover: parseColor('pos-color-interaction-hover'),
          disabled: parseColor('pos-color-interaction-disabled'),
        },
        danger: {
          DEFAULT: parseColor('pos-color-danger'),
          hover: parseColor('pos-color-danger-hover'),
          disabled: parseColor('pos-color-danger-disabled'),
        },
        confirmation: {
          DEFAULT: parseColor('pos-color-confirmation'),
          hover: parseColor('pos-color-confirmation-hover'),
          disabled: parseColor('pos-color-confirmation-disabled'),
        },
        warning: {
          DEFAULT: parseColor('pos-color-warning'),
          hover: parseColor('pos-color-warning-hover'),
          disabled: parseColor('pos-color-warning-disabled'),
        },
        alternative: {
          DEFAULT: parseColor('pos-color-alternative'),
          hover: parseColor('pos-color-alternative-hover'),
          disabled: parseColor('pos-color-alternative-disabled'),
          text: parseColor('pos-color-alternative-text'),
          'text-hover': parseColor('pos-color-alternative-text-hover')
        },
      },

      spacing: {
        10.5: '2.55rem',
        68: '17rem',
        100: '25rem',
      },

      boxShadow: {
        dropdown: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 -7px 10px -5px rgba(0, 0, 0, 0.06)',
      },

      fontSize: {
        '2xs': '.5rem',
      },

      lineHeight: {
        '11': '2.75rem',
      },

      minWidth: {
        '44': '11rem',
        '80': '20rem',
      },

      zIndex: {
        '-10': '-10',
      },
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '1rem',
        xl: '1rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1432px'
      }
    },
  },
};
