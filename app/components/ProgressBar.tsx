"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter, usePathname } from "next/navigation";

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

const ProgressBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const originalPush = router.push;
    router.push = async (...args) => {
      NProgress.start();
      try {
        await originalPush(...args);
      } finally {
        NProgress.done();
      }
    };
    return () => {
        router.push = originalPush;
    }
  }, [router]);

  return null;
};

export default ProgressBar;
