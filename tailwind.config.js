module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        60: '60',
      },
      width: {
        42: '10.5rem'
      },
      height: {
        104: '26rem',
        112: '28rem',
        120: '30rem'
      },
      padding: {
        '26rem': '26rem',
        '36rem': '36rem'
      }
    },
    fontFamily: {
      main: ['Averia Serif Regular', 'sans-serif'],
      'main-bold': ['Averia Serif Bold'],
      'main-light-italic': ['Averia Serif Light Italic'],
      secondary: ['Agrandir Narrow'],
      title: ['OPTIArtCraft'],
      subtitle: ['Averia Serif Bold Italic'],
      agrandir: ['Agrandir'],
      copenhagen: ['CopenhagenGrotesk'],
    },
    screens: {
      sm: '500px',
      md: '768px',
      ml: '1024px',
      lg: '1280px',
      xl: '1536px',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      1.5: '1.5px',
      2: '2px',
    },
    fontSize: {
      8.5: '0.531rem',
      9: '0.563rem',
      10: '0.625rem',
      11: '0.688rem',
      11.5: '0.719rem',
      12: '0.75rem',
      13: '0.813rem',
      13.5: '0.844rem',
      14: '0.875rem',
      15: '0.938rem',
      16: '1rem',
      17: '1.063rem',
      17.25: '1.078rem',
      18: '1.125rem',
      18.5: '1.156rem',
      19: '1.188rem',
      20: '1.25rem',
      20.5: '1.281rem',
      21: '1.313rem',
      22: '1.375rem',
      22.5: '1.406rem',
      23: '1.438rem',
      24: '1.5rem',
      25: '1.563rem',
      25.5: '1.594rem',
      26.5: '1.656rem',
      27: '1.688rem',
      27.5: '1.719rem',
      28: '1.75rem',
      29: '1.813rem',
      29.5: '1.844rem',
      30: '1.875rem',
      37: '2.313rem',
      32.5: '2.031rem',
      33: '2.063rem',
      40: '2.5rem',
      42: '2.625rem',
      43: '2.688rem',
      55: '3.438rem',
      55.5: '3.469rem',
      57: '3.563rem',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
