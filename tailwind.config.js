/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // الطريقة التقليدية
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};




// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#f0f9ff',
//           100: '#e0f2fe',
//           200: '#bae6fd',
//           300: '#7dd3fc',
//           400: '#38bdf8',
//           500: '#0ea5e9',
//           600: '#0284c7',
//           700: '#0369a1',
//           800: '#075985',
//           900: '#0c4a6e',
//           950: '#1e293b',
//         },
//         accent: {
//           50: '#ecfdf5',
//           100: '#d1fae5',
//           200: '#a7f3d0',
//           300: '#6ee7b7',
//           400: '#34d399',
//           500: '#10b981',
//           600: '#059669',
//           700: '#047857',
//           800: '#065f46',
//           900: '#064e3b',
//         },
//         warning: {
//           50: '#fffbeb',
//           100: '#fef3c7',
//           200: '#fde68a',
//           300: '#fcd34d',
//           400: '#fbbf24',
//           500: '#f59e0b',
//           600: '#d97706',
//           700: '#b45309',
//           800: '#92400e',
//           900: '#78350f',
//         }
//       },
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//         'hero-gradient': 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
//       },
//       animation: {
//         'float': 'float 6s ease-in-out infinite',
//         'fade-in': 'fadeIn 0.5s ease-in-out',
//         'slide-up': 'slideUp 0.5s ease-out',
//         'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//       },
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0px)' },
//           '50%': { transform: 'translateY(-10px)' },
//         },
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         }
//       }
//     },
//   },
//   plugins: [],
// };