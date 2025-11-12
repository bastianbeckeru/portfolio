'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { CSSProperties } from 'react';

type WeekCardProps = {
  className?: string;
  style?: CSSProperties;
};

export default function WeekCard({
  className,
  style,
  ...props
}: WeekCardProps) {
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn('border-2 rounded-full bg-background', className)}
      style={style}
      {...props}
    />
  );
}
