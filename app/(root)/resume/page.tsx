"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ResumePage() {
  useEffect(() => {
    redirect("https://drive.google.com/file/d/1jHc0J6cnYG-eDUHVr2KBlMx0mr0Dxgpx/edit" || "/");
  }, []);
  return <div>Redirecting to the resume...</div>;
}
