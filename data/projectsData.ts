interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Appreciating the Analog - Creating a Custom Clock Face',
    description: 'I made a wooden clock face for an old clock clockwork, so I could finally have an analog clock in my room again.',
    href: '/blog/wooden_clockface',
    imgSrc: '/static/images/custom_clockface/disc_drawings.jpg',
  },
  {
    title: 'Knit Bracelet',
    description: 'I knit a bracelet out of brass wire.',
    href: '/blog/knit_bracelet',
    imgSrc: '/static/images/knit_bracelet/finished.jpg'
  },
  {
    title: 'Heart Pendant',
    description: 'I created a heart pendant out of two stones I found in a local quarry lake.',
    href: '/blog/heart_pendant',
    imgSrc: '/static/images/heart_pendant.jpg'
  },
  {
    title: 'Companion Cube Pendant',
    description: 'I made a pendant resembling the Companion Cube from Portal.',
    href: '/blog/companion_cube_pendant',
    imgSrc: '/static/images/companion_cube.jpg'

  },
]

export default projectsData
