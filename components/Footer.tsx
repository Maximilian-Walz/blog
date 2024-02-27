import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import { SocialIconProps } from '@/components/social-icons'

export default function Footer() {
  const socialIcons: SocialIconProps[] = [
    {
      kind: 'mail',
      href: `mailto:${siteMetadata.email}`,
    },
    {
      kind: 'github',
      href: siteMetadata.github,
    },
    {
      kind: 'reddit',
      href: siteMetadata.reddit,
    },
  ]
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {socialIcons.map((props, i) => (
            <SocialIcon key={i} {...props} size={6} animDelay={i * 0.1} />
          ))}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{siteMetadata.author}</div>
        </div>
      </div>
    </footer>
  )
}
