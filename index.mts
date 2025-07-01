import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import { execSync } from "child_process";

// Get current hour
const now = dayjs();
const hour = now.hour();

// Format
const timestamp = now.format("YYYY-MM-DD HH:mm:ss");
const dateFilePart = now.format("YYYY-MM-DD-HH");
const datePretty = now.format("MMMM D, YYYY h:mm A");

// Load quotes and lessons
const quotes = fs.readFileSync("quotes.txt", "utf8").split("\n").filter(Boolean);
const lessons = fs.readFileSync("dev-lessons.txt", "utf8").split("\n").filter(Boolean);

// Helpers
const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const writeFile = (slug: string, frontmatter: string, content: string) => {
  const filePath = path.join("content", `${slug}.md`);
  fs.writeFileSync(filePath, `${frontmatter}\n\n${content}`);
  return filePath;
};

const commitAndPush = (msg: string) => {
  execSync("git add .");
  execSync(`git commit -m "${msg}"`);
  execSync("git push");
};

// Handle commit type
if (hour >= 5 && hour < 12) {
  // 🌅 Morning - Quote
  const quote = getRandom(quotes);
  const frontmatter = `---\ntitle: "🌟 Motivation of the Day"\ndate: "${datePretty}"\n---`;
  const content = `"${quote}"`;
  writeFile(`${dateFilePart}-quote`, frontmatter, content);
  commitAndPush(`🌅 Morning Motivation: "${quote}"`);
  console.log("✅ Morning quote committed");
} else if (hour >= 12 && hour < 18) {
  // 🌆 Evening - Dev Lesson
  const lesson = getRandom(lessons);
  const frontmatter = `---\ntitle: "📚 Dev Lesson"\ndate: "${datePretty}"\n---`;
  const content = `${lesson}`;
  writeFile(`${dateFilePart}-lesson`, frontmatter, content);
  commitAndPush(`🌆 Evening Lesson: ${lesson.slice(0, 40)}...`);
  console.log("✅ Evening lesson committed");
} else {
  // 🌙 Night - Website promo
  const siteURL = "https://behindthescenes.vercel.app";
  const frontmatter = `---\ntitle: "📢 Nightly Reminder"\ndate: "${datePretty}"\n---`;
  const content = `Hey there! 👋\n\nDon't forget to check out my daily dev drops at 👉 [BehindTheScenes](${siteURL})`;
  writeFile(`${dateFilePart}-reminder`, frontmatter, content);
  commitAndPush("🌙 Night Reminder: Check out BehindTheScenes!");
  console.log("✅ Night reminder committed");
}
