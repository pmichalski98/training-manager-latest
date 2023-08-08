import React from "react";

function ErrorText({ children }: { children?: string | string[] }) {
  return <>{children && <p className="pt-1 text-red-500/90">{children}</p>}</>;
}

export default ErrorText;
