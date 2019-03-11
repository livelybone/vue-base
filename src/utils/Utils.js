export const isBrowser =
  typeof window !== 'undefined' &&
  typeof Window !== 'undefined' &&
  window &&
  Window &&
  window instanceof Window
