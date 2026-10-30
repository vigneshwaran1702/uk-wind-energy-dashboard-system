import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader({ message = "Loading Elexon data..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500 gap-3">
      <Loader2 className="animate-spin text-emerald-600" size={32} />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
