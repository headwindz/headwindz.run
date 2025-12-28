interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Figx',
    description: `A comprehensive and reliable figma utilities library. Written in TypeScript with native type support, figx provides a collection of utilities for working with Figma, including color conversion, easy-to-use APIs, and comprehensive documentation.`,
    href: 'https://figx.headwindz.me',
    imgSrc: '/static/projects/figx.jpeg',
  },
  {
    title: 'Toolhub',
    description: `A comprehensive curated collection of essential developer tools and utilities designed to boost productivity. Features a wide range of tools including JSON formatter and viewer for data visualization, intelligent image compressor for web optimization, OCR for text extraction from images, customizable QR code generator, cryptographic hash generators (MD5, SHA1, SHA256), advanced color picker with palette generation, WCAG-compliant color contrast checker, Base64 encoder/decoder, multi-base number converter (binary, octal, decimal, hex), JWT token decoder and analyzer, and many more utilities to streamline your workflow.`,
    href: 'https://toolhub.run',
    imgSrc: '/static/projects/toolhub.jpeg',
  },
]

export default projectsData
