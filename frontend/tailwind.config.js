/* @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enable dark mode using a class
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "#224fa1", // suttle blue
        "primary-foreground": "#6A9C89", //light suttle green
        secondary: "#FF4500", // Orange-red accent
        "secondary-foreground": "#6A9C89", //light suttle green
        muted: "#ffff", // Dark gray
        "muted-foreground": "#6A9C89", //suttle dark blue
        accent: "##224fa1", // light blue
        "accent-foreground": "#6A9C89", //suttle green
        destructive: "#DC2626", // orange for errors
        "destructive-foreground": "#6A9C89", // green
        border: "#205375", // blue
        "border-white": "#6A9C89", // suttle green
        input: "#053B50", // Dark gray input background
        ring: "##224fa1", // light blue
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        outline: '2px', // Custom border width for outlines
      },
    },
  },
  plugins: [],
}
