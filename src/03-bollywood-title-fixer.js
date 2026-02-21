/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie titlec
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {
  if (typeof title != "string") return "";
  title = title.trim();
  console.log("hwrew", title);
  // if (title !== "") return "";
  console.log("hwrew", title);
  let arrTitle = title.replace(/\s+/g, " ").split(" ");
  console.log("test", arrTitle);
  let arrExpectional = ["ke", "a", "in", "of", "the", "ki", "ka"];
  return arrTitle
    .map((e, i) => {
      const lower = e.toLowerCase().trim();
      if (i !== 0 && arrExpectional.includes(e)) {
        return lower.trim();
      }
      return `${lower.charAt(0).toUpperCase()}${lower.slice(1).toLowerCase()}`;
    })
    .join(" ");
}
console.log(fixBollywoodTitle("ek tha tiger ke baad"));
