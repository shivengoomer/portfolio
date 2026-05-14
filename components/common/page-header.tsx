interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/80 px-6 py-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 sm:px-8 sm:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="max-w-3xl flex-1 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
            Portfolio Section
          </p>
          <h1 className="relative inline-block font-heading text-3xl font-semibold tracking-tight text-zinc-900 capitalize dark:text-zinc-100 lg:text-4xl">
            {title}
            <span className="absolute -bottom-1 left-0 h-[3px] w-12 rounded-full bg-blue-500/60" />
          </h1>
          <p className="max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
