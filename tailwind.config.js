/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Girlish Color Palette
        pink: {
          DEFAULT: '#ff9ecd',
          light: '#ffd6e8',
          dark: '#ff7eb8',
          deep: '#e85a9a',
          hot: '#ff4d9e',
          baby: '#ffcce0',
        },
        lavender: {
          DEFAULT: '#e8d5f2',
          light: '#f5e6fa',
          dark: '#d4b8e8',
          deep: '#c9a0dc',
        },
        rose: {
          DEFAULT: '#f4c2c2',
          light: '#f9e0e0',
          gold: '#f4c2c2',
        },
        cream: {
          DEFAULT: '#fff5f7',
          light: '#fffaf0',
        },
        blush: {
          DEFAULT: '#ffe4ec',
          dark: '#ffc4d6',
        },
        mauve: {
          DEFAULT: '#e0b0ff',
          light: '#f0d9ff',
        },
        coral: {
          DEFAULT: '#ffb3ba',
          light: '#ffd1d6',
        },
        periwinkle: {
          DEFAULT: '#c9c3e6',
          light: '#e6e3f2',
        },
        champagne: {
          DEFAULT: '#f7e7ce',
        },
      },
      fontFamily: {
        script: ['Great Vibes', 'cursive'],
        body: ['Poppins', 'sans-serif'],
        accent: ['Qwitcher Grypen', 'cursive'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        romantic: '0 10px 40px rgba(255, 158, 205, 0.4)',
        'romantic-lg': '0 20px 60px rgba(255, 158, 205, 0.5)',
        'romantic-xl': '0 30px 80px rgba(255, 158, 205, 0.6)',
        glow: '0 0 30px rgba(255, 158, 205, 0.6)',
        'glow-lg': '0 0 50px rgba(255, 158, 205, 0.8)',
        lavender: '0 10px 40px rgba(232, 213, 242, 0.5)',
        'lavender-lg': '0 20px 60px rgba(232, 213, 242, 0.6)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-25px) rotate(8deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(0deg)" },
          "25%": { transform: "translateY(-20px) translateX(15px) rotate(5deg)" },
          "50%": { transform: "translateY(-35px) translateX(-10px) rotate(-5deg)" },
          "75%": { transform: "translateY(-15px) translateX(-20px) rotate(3deg)" },
        },
        "float-3d": {
          "0%, 100%": { transform: "translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg)" },
          "25%": { transform: "translateY(-30px) translateZ(50px) rotateX(10deg) rotateY(15deg)" },
          "50%": { transform: "translateY(-20px) translateZ(100px) rotateX(-5deg) rotateY(-10deg)" },
          "75%": { transform: "translateY(-40px) translateZ(30px) rotateX(5deg) rotateY(5deg)" },
        },
        "pulse-heart": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 158, 205, 0.4), 0 0 40px rgba(255, 158, 205, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 158, 205, 0.8), 0 0 80px rgba(255, 158, 205, 0.4)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0", transform: "scale(0) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(180deg)" },
        },
        "rise": {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100px) rotateY(45deg)" },
          "100%": { opacity: "1", transform: "translateX(0) rotateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100px) rotateY(-45deg)" },
          "100%": { opacity: "1", transform: "translateX(0) rotateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "swing": {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "flip-in": {
          "0%": { opacity: "0", transform: "rotateY(-90deg)" },
          "100%": { opacity: "1", transform: "rotateY(0)" },
        },
        "morph": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 5s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "float-3d": "float-3d 8s ease-in-out infinite",
        "pulse-heart": "pulse-heart 1s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "rise": "rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "bounce-in": "bounce-in 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards",
        "orbit": "orbit 15s linear infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "swing": "swing 3s ease-in-out infinite",
        "wiggle": "wiggle 2s ease-in-out infinite",
        "flip-in": "flip-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "morph": "morph 8s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
