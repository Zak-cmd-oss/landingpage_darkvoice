import { useRef } from "react";

interface UseCompositionOptions<T extends HTMLElement> {
  onKeyDown?: (e: React.KeyboardEvent<T>) => void;
  onCompositionStart?: (e: React.CompositionEvent<T>) => void;
  onCompositionEnd?: (e: React.CompositionEvent<T>) => void;
}

export function useComposition<T extends HTMLElement>({
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
}: UseCompositionOptions<T>) {
  const isComposingRef = useRef(false);

  return {
    onCompositionStart: (e: React.CompositionEvent<T>) => {
      isComposingRef.current = true;
      onCompositionStart?.(e);
    },
    onCompositionEnd: (e: React.CompositionEvent<T>) => {
      isComposingRef.current = false;
      onCompositionEnd?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent<T>) => {
      if (!isComposingRef.current) {
        onKeyDown?.(e);
      }
    },
  };
}
