import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom': {
          'turquoise': '#5FA7B7',
          'lightblue': '#206ECB',
          'darkblue': '#020060',
          'white': '#FFFFFF',
          'orange': '#F47A17',
          'yellow': '#F7CC2F'
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient": "linear-gradient(82deg, #945E13 0%, #CFB758 100%)",
        "blue-gradient": "linear-gradient(to right, #206ECB, #020060)",
        "warm-gradient": "linear-gradient(to right, #206ECB, #5FA7B7)",
        "cool-gradient": "linear-gradient(45deg, #FFFFF, #37A45B)",
        "mixed-gradient": "linear-gradient(to bottom right, #FFFFF, #FFE64E, #37A45B)",
      },
      fontFamily: {
        'segoe': ['Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'special-offer': ['36px', {
          lineHeight: '47.88px',
        }],
      },
      fontWeight: {
        'semi-bold': '600',
      },
      textShadow: {
        'glow': '0 0.25rem 0.625rem rgba(0, 0, 0, 0.25)',
        'luminous': '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #fff',
        'bright': '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.8)',
      'shine': '0 0 2px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.3), 0 0 6px rgba(255,255,255,0.2)',

      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
};

export default config;