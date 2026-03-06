import * as React from 'react';
import { cn } from '@/utils/cn';
import { r2cdn } from '@/lib/cdn';

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <img
      src={r2cdn('/favicon.svg')}
      alt='Logo'
      className={cn('object-contain', className)}
      width={42}
      height={42}
      {...props}
    />
  );
}
