import ExportedImage, { ExportedImageProps } from 'next-image-export-optimizer'

const Image = ({ ...rest }: ExportedImageProps) => <ExportedImage {...rest} />

export default Image
