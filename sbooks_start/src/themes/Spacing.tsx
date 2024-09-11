import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customSpacing: Record<string, string>;
  }
  interface ThemeOptions {
    customSpacing?: Record<string, string>;
  }
}

const spacing = [
  { name: "0", px: 0, rem: 0 },
  { name: "px", px: 1, rem: 0.063 },
  { name: "0.5", px: 2, rem: 0.125 },
  { name: "1", px: 4, rem: 0.25 },
  { name: "1.5", px: 6, rem: 0.375 },
  { name: "2", px: 8, rem: 0.5 },
  { name: "2.5", px: 10, rem: 0.625 },
  { name: "3", px: 12, rem: 0.75 },
  { name: "3.5", px: 14, rem: 0.875 },
  { name: "4", px: 16, rem: 1 },
  { name: "5", px: 20, rem: 1.25 },
  { name: "6", px: 24, rem: 1.5 },
  { name: "7", px: 28, rem: 1.75 },
  { name: "8", px: 32, rem: 2 },
  { name: "9", px: 36, rem: 2.25 },
  { name: "10", px: 40, rem: 2.5 },
  { name: "11", px: 44, rem: 2.75 },
  { name: "12", px: 48, rem: 3 },
  { name: "14", px: 56, rem: 3.5 },
  { name: "16", px: 64, rem: 4 },
  { name: "20", px: 80, rem: 5 },
  { name: "24", px: 96, rem: 6 },
  { name: "28", px: 112, rem: 7 },
  { name: "32", px: 128, rem: 8 },
  { name: "36", px: 144, rem: 9 },
  { name: "40", px: 160, rem: 10 },
  { name: "44", px: 176, rem: 11 },
  { name: "48", px: 192, rem: 12 },
  { name: "52", px: 208, rem: 13 },
  { name: "56", px: 224, rem: 14 },
  { name: "60", px: 240, rem: 15 },
  { name: "64", px: 256, rem: 16 },
  { name: "72", px: 288, rem: 18 },
  { name: "80", px: 320, rem: 20 },
  { name: "96", px: 384, rem: 24 },
];


export default spacing;
