"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModalStore } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, { message: "Please write a bit more — context helps a lot." }),
  social: z.string().url().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const storeModal = useModalStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "", social: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        form.reset();
        storeModal.onOpen({
          title: "Message sent!",
          description:
            "Got it — I'll get back to you within 24 hours. Check your inbox for a confirmation.",
          icon: Icons.successAnimated,
        });
        return;
      }

      form.setError("root", { message: "Something went wrong. Please try again." });
    } catch {
      form.setError("root", { message: "Can't reach the server right now — email me directly instead." });
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "rounded-xl border border-border bg-surface-2 text-text placeholder:text-text-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/60 transition-all duration-150";
  const labelClass = "text-xs font-semibold uppercase tracking-[0.12em] text-text-muted";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Name + Email side by side on md+ */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" autoComplete="name" className={fieldClass} {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@company.com" autoComplete="email" type="email" className={fieldClass} {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What are you building? Share scope, timeline, or even a rough idea — I'm all ears."
                  rows={5}
                  className={`${fieldClass} resize-none`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="social"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>
                Link{" "}
                <span className="normal-case font-normal tracking-normal text-text-muted/60">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="LinkedIn, GitHub, portfolio…" autoComplete="url" className={fieldClass} {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {form.formState.errors.root?.message && (
          <p className="rounded-lg border border-destructive/20 bg-destructive/8 px-4 py-2.5 text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl font-semibold tracking-wide"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Icons.spinner className="h-4 w-4 animate-spin" />
              Sending…
            </span>
          ) : (
            "Send Message →"
          )}
        </Button>
      </form>
    </Form>
  );
}
