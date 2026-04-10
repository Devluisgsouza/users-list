import { type RefObject, useEffect, useRef } from 'react'

export function useClickOutside<E extends HTMLElement>(
  ref: RefObject<E | null>,
  onOutsideClick: () => void,
): void {
  const onOutsideClickRef = useRef(onOutsideClick)
  onOutsideClickRef.current = onOutsideClick

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      const node = ref.current
      if (node && !node.contains(event.target as Node)) {
        onOutsideClickRef.current()
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [ref])
}
