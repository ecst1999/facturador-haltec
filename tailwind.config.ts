import type { Config } from 'tailwindcss'
import { keepTheme } from "keep-react/keepTheme";

const config : Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
}

export default keepTheme(config);