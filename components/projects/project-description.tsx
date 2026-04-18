import React from "react";

const ProjectDescription: React.FC<{
  paragraphs: string[];
  bullets: string[];
}> = ({ paragraphs, bullets }) => {
  return (
    <div className="text-neutral-600 dark:text-neutral-300">
      {paragraphs.map((paragraph, index) => (
        <p className="mb-4 text-base leading-8" key={index}>
          {paragraph}
        </p>
      ))}
      <ul className="mt-5 space-y-3 pl-5 text-sm leading-7 marker:text-primary sm:text-base">
        {bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDescription;
