interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/80 px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 sm:px-8 sm:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="max-w-3xl flex-1 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
            Portfolio Section
          </p>
          <h1 className="inline-block font-heading text-4xl tracking-[-0.04em] text-neutral-950 lg:text-5xl dark:text-white capitalize">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
