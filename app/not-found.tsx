"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
   const router = useRouter();

   useEffect(() => {
      const timer = setTimeout(() => {
         router.push("/");
      }, 1000);

      return () => clearTimeout(timer);
   }, [router]);

   return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
         <h1 className="text-4xl font-bold">404</h1>
         <p className="text-muted-foreground">Page not found. Redirecting to home...</p>
      </div>
   );
}