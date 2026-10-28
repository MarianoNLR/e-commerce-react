/** @type {import('tailwindcss').Config} */
export default {
	corePlugins: {
		preflight: false,
	},
    // darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        border: 'var(--border)',
        content: 'var(--text)',
        muted: 'var(--text-muted)',
        accent: { DEFAULT: 'var(--accent)', hover: 'var(--accent-hover)', contrast: 'var(--accent-contrast)' },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [],
}

