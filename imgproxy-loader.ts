type ImgproxyProps = {
  src: string
  width?: number
  height?: number
  quality?: number
}

export default function imgproxyLoader({ src, width, height, quality }: ImgproxyProps) {
  width ??= 0
  height ??= 0
  return `https://images.maximilian-walz.com/insecure/rs:fill:${width}:${height}/g:sm/plain/local:///${src}@webp`
}
