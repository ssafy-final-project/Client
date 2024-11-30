/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [
    // "./src/**/*.{vue,js,ts,jsx,tsx}", // Vue 파일들을 스캔하도록 설정
  ],
  theme: {
    extend: {
      inset: {
        "1/80": "1.25%",
        "1/40": "2.5%",
        "1/20": "5%",
        "1/10": "10%",
        "1/5": "20%",
      },
      backgroundOpacity: {
        95: "0.95",
        90: "0.9",
        80: "0.8",
        70: "0.7",
      },
    },
  },
  plugins: [],
};
