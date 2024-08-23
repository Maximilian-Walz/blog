import PageViewTracker from '@/components/PageViewTracker'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { formatDate } from 'pliny/utils/formatDate'

export const metadata = genPageMetadata({ title: 'Legal' })

export default function Legal() {
  const updated = '2024-08-23'

  return (
    <div className="ml-auto w-4/5">
      <PageViewTracker title="Legal" />
      <h1 className="mb-1 text-2xl font-extrabold sm:text-3xl md:text-4xl">Privacy Policy</h1>
      <div className="flex gap-2 text-base font-medium leading-6 text-gray-500">
        <dt>Last Updated on:</dt>
        <dd>
          <time dateTime={updated}>{formatDate(updated, siteMetadata.locale)}</time>
        </dd>
      </div>
      <p className="prose prose-invert mt-2">
        Your privacy is important to me. This Privacy Policy outlines what information I collect
        when you visit this website and how I use it.
      </p>

      <h2 className="mb-1 mt-6 text-xl font-extrabold sm:text-2xl md:text-3xl">
        1. Information I Collect
      </h2>
      <ul className="prose prose-invert ml-5 list-disc">
        <li>
          <b>Personal Information:</b> If you contact me through a form or email, I may collect your
          name, email address, and any other details you provide.
        </li>
        <li>
          <b>Non-Personal Information:</b> I collect data like your IP address, browser type, and
          pages you visit to help improve the website.
        </li>
      </ul>

      <h2 className="mb-1 mt-6 text-xl font-extrabold sm:text-2xl md:text-3xl">
        2. How I Use Your Information
      </h2>
      <ul className="prose prose-invert ml-5 list-disc">
        <li>
          <b>Personal Information:</b> Used only to respond to your inquiries or provide updates
          you’ve requested.
        </li>
        <li>
          <b>Non-Personal Information:</b> Helps me understand how visitors use the site and improve
          its content.
        </li>
      </ul>

      <h2 className="mb-1 mt-6 text-xl font-extrabold sm:text-2xl md:text-3xl">
        3. Analytics with Matomo
      </h2>
      <p className="prose prose-invert">
        I use <a href="https://matomo.org/matomo-on-premise/">Matomo On-Premise</a>, a self-hosted
        analytics tool, to understand how visitors interact with my site. Your IP address is
        anonymized, and all data is stored securely on servers, hosted in Germany. If you prefer not
        to be tracked, enable the "Do Not Track" feature in your browser.
      </p>

      <h2 className="mb-1 mt-6 text-xl font-extrabold sm:text-2xl md:text-3xl">4. Cookies</h2>
      <p className="prose prose-invert">
        I do not use cookies on this website. My analytics platform,{' '}
        <a href="https://matomo.org/matomo-on-premise/">Matomo On-Premise</a>, is configured in a
        way that does not rely on cookies for tracking.
      </p>

      <h2 className="mb-1 mt-6 text-xl font-extrabold sm:text-2xl md:text-3xl">
        5. Third-Party Links
      </h2>
      <p className="prose prose-invert">
        My website may link to other sites. I’m not responsible for their content or privacy
        practices, so please review their policies.
      </p>

      <h2 className="mb-1 mt-6 text-xl font-extrabold sm:text-2xl md:text-3xl">6. Your Rights</h2>
      <p className="prose prose-invert">
        You can access, correct, or delete your personal information by contacting me at{' '}
        <a href="mailto:contact@maximilian-walz.com">contact@maximilian-walz.com</a>.
      </p>

      <h2 className="mb-1 mt-6 text-xl font-extrabold sm:text-2xl md:text-3xl">7. Updates</h2>
      <p className="prose prose-invert">
        I may update this policy occasionally. Any changes will be posted here with the latest
        revision date.
      </p>
    </div>
  )
}
