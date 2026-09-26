import { gsap } from '@lib/gsap'

// staggered rise-in for [data-reveal] children of each [data-section]
export function createSectionReveals(root: HTMLElement, start = 'top 80%') {
  const tweens = gsap.utils
    .toArray<HTMLElement>(root.querySelectorAll('[data-section]'))
    .map((section) =>
      gsap.from(section.querySelectorAll('[data-reveal]'), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start },
      }),
    )
  return () => tweens.forEach((t) => t.scrollTrigger?.kill())
}
