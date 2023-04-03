/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx, ts}"],
  theme: {
    extend: {
      height: {
        withOutHeader: "calc(100vh - 64px)",
      },
      maxWidth: {
        withOutAvatar: "calc(100vw - 96px - 96px - 48px)",
      },
      width: {
        withOutBar: "calc(100vw - 96px)",
      },
      colors: {
        bgButton: "#2F3136",
        bgSecondaryButton: "#4F545C",
        iconColor: "#10B981",
        bgSecondary: "#202225",
        bgPrimary: "#36393F",
        textColor: "#666D7A",
      },
      keyframes: {
        showBar: {
          "0%": { width: "0px" },
          "100%": { width: "w-16" },
        },
        popUp: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        popup: "popUp .1s ease-in-out forwards",
        showNavBar: "showBar .1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
}
