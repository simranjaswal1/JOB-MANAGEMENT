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
        primary: "#FF0000", // Red primary color
        "primary-foreground": "#FFFFFF",
        secondary: "#FF4500", // Orange-red accent
        "secondary-foreground": "#FFFFFF",
        muted: "#333333", // Dark gray
        "muted-foreground": "#FFFFFF",
        accent: "#FF0000", // Red accent
        "accent-foreground": "#FFFFFF",
        destructive: "#DC2626", // Darker red for errors
        "destructive-foreground": "#FFFFFF",
        border: "#444444", // Darker border color
        "border-white": "#FFFFFF", // Custom white border color
        input: "#333333", // Dark gray input background
        ring: "#FF0000", // Red ring color
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
