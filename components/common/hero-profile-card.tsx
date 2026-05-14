"use client";

import dynamic from "next/dynamic";

const ProfileCard = dynamic(() => import("@/components/ProfileCard"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full max-w-[340px] animate-pulse rounded-[30px] bg-zinc-200 dark:bg-zinc-800" />
  ),
});

export function HeroProfileCard() {
  return (
    <div
      className="w-full max-w-[340px]"
      style={{
        // Kill all colorful overlays via CSS variable overrides
        '--sunpillar-1': 'hsla(0, 0%, 60%, 0.3)',
        '--sunpillar-2': 'hsla(0, 0%, 65%, 0.3)',
        '--sunpillar-3': 'hsla(0, 0%, 60%, 0.3)',
        '--sunpillar-4': 'hsla(0, 0%, 65%, 0.3)',
        '--sunpillar-5': 'hsla(0, 0%, 60%, 0.3)',
        '--sunpillar-6': 'hsla(0, 0%, 65%, 0.3)',
      } as React.CSSProperties}
    >
      <ProfileCard
        name="Shiven Goomer"
        title="Full Stack Developer"
        handle="shivengoomer"
        status="Available for work"
        contactText="Contact"
        avatarUrl="/profile-img.jpg"
        miniAvatarUrl="/profile-img.jpg"
        enableTilt={true}
        showUserInfo={true}
        innerGradient="transparent"
        behindGlowEnabled={false}
        behindGlowColor="transparent"
        onContactClick={() => {
          window.location.href = "/contact";
        }}
        className="w-full [&_section]:!aspect-square [&_section]:!max-h-[340px]"
      />
    </div>
  );
}
