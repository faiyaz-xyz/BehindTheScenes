import React from "react";

type Props = {
  title: string;
  content: string;
  date: string;
};

const EntryCard: React.FC<Props> = ({ title, content, date }) => {
  return (
    <article className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-indigo-500 transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="whitespace-pre-wrap">{content}</div>
      <p className="mt-3 text-sm text-gray-400">{date}</p>
    </article>
  );
};

export default EntryCard;
