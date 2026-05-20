'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Avoid page animations on confirmation to make layoutId transition cleaner, 
  // or use standard transition for all pages. Let's make it smooth for all.
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}
