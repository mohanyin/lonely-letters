export const MEDALS = ["🥇", "🥈", "🥉"];

export const DIGITS = [
  "0️⃣",
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
];

export function numberAsEmojis(number: number): string {
  return number
    .toString()
    .split("")
    .map((digit) => DIGITS[parseInt(digit)])
    .join("");
}
