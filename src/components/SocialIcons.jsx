// Iconos de redes (SVG propios) + datos — edita handles, seguidores y enlaces.

export const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
  </svg>
)

export const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81M9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
  </svg>
)

export const TiktokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M16.6 5.82a4.28 4.28 0 0 1-1.1-2.82h-3.4v13.6a2.53 2.53 0 0 1-2.53 2.53 2.53 2.53 0 0 1-2.53-2.53 2.53 2.53 0 0 1 3.36-2.39V10.3a5.9 5.9 0 0 0-.83-.06A5.94 5.94 0 0 0 3.2 16.18a5.94 5.94 0 0 0 5.94 5.94 5.94 5.94 0 0 0 5.94-5.94V9.4a7.68 7.68 0 0 0 4.49 1.44V7.44a4.28 4.28 0 0 1-2.91-1.62Z" />
  </svg>
)

export const SOCIAL = [
  {
    name: 'Instagram',
    handle: '@juanwagner',
    followers: '12K',
    href: '#',
    Icon: InstagramIcon,
  },
  {
    name: 'TikTok',
    handle: '@juanwagner',
    followers: '6.5K',
    href: '#',
    Icon: TiktokIcon,
  },
  {
    name: 'YouTube',
    handle: 'Juan Wagner',
    followers: '1.8K',
    href: '#',
    Icon: YoutubeIcon,
  },
]
