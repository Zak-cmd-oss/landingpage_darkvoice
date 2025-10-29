import { usePerspective } from '@/hooks/usePerspective';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export function Card3D({ children, className }: Card3DProps) {
  const ref = usePerspective({
    maxRotation: 8,
    maxTranslation: 10,
    smoothness: 0.12,
    scale: 1.02,
    glare: true,
    glareOpacity: 0.15,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-lg border border-border bg-card p-6',
        'transition-all duration-300 ease-out',
        'hover:shadow-lg hover:shadow-primary/10',
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

