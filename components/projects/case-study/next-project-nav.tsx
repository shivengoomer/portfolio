"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ProjectInterface } from "@/config/projects";
import { formatDateFromObj } from "@/lib/utils";

interface NextProjectNavProps {
  prevProject: ProjectInterface | null;
  nextProject: ProjectInterface | null;
}

export default function NextProjectNavigation({
  prevProject,
  nextProject,
}: NextProjectNavProps) {
  if (!prevProject && !nextProject) return null;

  return (
    <section className="py-16 sm:py-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Prev */}
          {prevProject ? (
            <Link href={`/projects/${prevProject.id}`} className="group">
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-border bg-surface p-6 space-y-2 hover:border-accent/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 text-text-muted font-mono text-[11px] uppercase tracking-widest">
                  <ArrowLeft className="h-3 w-3" />
                  Previous Project
                </div>
                <div className="font-heading text-xl sm:text-2xl font-bold uppercase text-text group-hover:text-accent transition-colors duration-200">
                  {prevProject.companyName}
                </div>
                <div className="font-mono text-xs text-text-muted">
                  {prevProject.category.slice(0, 2).join(" · ")}
                </div>
              </motion.div>
            </Link>
          ) : (
            <div />
          )}

          {/* Next */}
          {nextProject ? (
            <Link href={`/projects/${nextProject.id}`} className="group">
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-border bg-surface p-6 space-y-2 hover:border-accent/30 transition-colors duration-200 text-right"
              >
                <div className="flex items-center justify-end gap-2 text-text-muted font-mono text-[11px] uppercase tracking-widest">
                  Next Project
                  <ArrowRight className="h-3 w-3" />
                </div>
                <div className="font-heading text-xl sm:text-2xl font-bold uppercase text-text group-hover:text-accent transition-colors duration-200">
                  {nextProject.companyName}
                </div>
                <div className="font-mono text-xs text-text-muted">
                  {nextProject.category.slice(0, 2).join(" · ")}
                </div>
              </motion.div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to all projects */}
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent transition-colors duration-200"
          >
            ← View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
