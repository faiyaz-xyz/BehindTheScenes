import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import EntryCard from "@/components/EntryCard";

export default async function HomePage() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(contentDir);

  const entries = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(contentDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();

      return {
        slug: filename.replace(".md", ""),
        title: data.title || "Untitled",
        content: contentHtml,
        date: data.date || "Unknown date",
      };
    })
  );

  entries.sort((a, b) => (a.slug < b.slug ? 1 : -1));

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 text-indigo-400">BehindTheScenes</h1>
      {entries.map((entry) => (
        <EntryCard
          key={entry.slug}
          title={entry.title}
          content={entry.content}
          date={entry.date}
        />
      ))}
    </main>
  );
}
