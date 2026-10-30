import React from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
      <AlertCircle className="shrink-0 text-red-500" size={20} />
      <span>{message}</span>
    </div>
  );
}
