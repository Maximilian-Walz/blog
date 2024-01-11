interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Appreciating the Analog - Creating a Custom Clock Face',
    description: `
      I like analog clocks. I know a lot of people who find them hard to read compared to their digital counterparts but to me they communicate time in a very distinct way. Growing up, a digital clock on every household appliance wasn't exactly the standard. So the analog clocks that were hanging in basically every room where the ones I learned to read first. And now, having gotten used to them over the years, I don't really have to parse the digits the clock hands are pointing to. I see the angle they're at and get a sense of time passed - just by giving it a quick glance.
    `,
    imgSrc: '/static/images/custom_clockface/disc_drawings.jpg',
    href: '/blog/wooden_clockface',
  },
]

export default projectsData
