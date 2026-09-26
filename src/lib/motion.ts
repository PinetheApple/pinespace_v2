// Canonical media queries for motion/pointer gating. One place to change them,
// one place that gets the SSR guard right.

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const MOTION_REDUCE = '(prefers-reduced-motion: reduce)'
export const POINTER_FINE = '(pointer: fine)'
export const POINTER_COARSE = '(pointer: coarse)'

// Full GSAP matchMedia keys — desktop gets the full show, touch a lighter one.
export const MOTION_DESKTOP = `${MOTION_OK} and ${POINTER_FINE}`
export const MOTION_TOUCH = `${MOTION_OK} and ${POINTER_COARSE}`

// SSR-safe: window is absent during server render, so default to "no match".
export function mediaMatches(query: string): boolean {
  return typeof window !== 'undefined' && window.matchMedia(query).matches
}

export function prefersReducedMotion(): boolean {
  return mediaMatches(MOTION_REDUCE)
}
