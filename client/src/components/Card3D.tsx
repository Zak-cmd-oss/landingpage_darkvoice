import { cn } from '@/lib/utils';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export function Card3D({ children, className }: Card3DProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-border bg-card p-6',
        'transition-all duration-300 ease-out',
        'hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
