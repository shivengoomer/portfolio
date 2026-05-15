"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ResumePage() {
  useEffect(() => {
    redirect("https://drive.google.com/file/d/1Yoj84KJHPR-TUEMuZWbRMbLJ2Tbu5qvA/view?usp=drive_link" || "/");
  }, []);
  return <div>Redirecting to the resume...</div>;
}
