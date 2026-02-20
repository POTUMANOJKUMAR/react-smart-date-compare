/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--sdc-primary-color, #3b82f6)',
                    light: 'var(--sdc-primary-light, #eff6ff)',
                    hover: 'var(--sdc-primary-hover, #2563eb)',
                },
                compare: {
                    DEFAULT: 'var(--sdc-compare-color, #f97316)',
                    light: 'var(--sdc-compare-light, #fff7ed)',
                    hover: 'var(--sdc-compare-hover, #ea580c)',
                }
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-out',
            }
        },
    },
    plugins: [],
}
