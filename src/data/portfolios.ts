import img1 from '../img/portImages/expense-tracker.png'
import img2 from '../img/portImages/car-rental.png'
import img3 from '../img/portImages/food-ordering-app.png'
import img4 from '../img/portImages/color-generator.jpg'

export type Portfolios = {
  id: number
  category: string
  image: string
  link1: string
  link2: string
  title: string
  text: string
}

const portfolios: Portfolios[] = [
  {
    id: 1,
    category: 'React',
    image: img1,
    link1: 'https://github.com/sandurijal03/expense-tracking',
    link2: 'https://www.google.com',
    title: 'Expense Tracking Application',
    text: '',
  },
  {
    id: 2,
    category: 'React',
    image: img3,
    link1: 'https://github.com/sandurijal03/food_ordering_app',
    link2: 'https://www.google.com',
    title: 'Food Ordering Application',
    text: '',
  },
  {
    id: 3,
    category: 'Node',
    image: img2,
    link1: 'https://github.com/sandurijal03/college-work',
    link2: 'https://www.google.com',
    title: 'Car Rental Application',
    text: '',
  },
  {
    id: 5,
    category: 'React',
    image: img4,
    link1: 'https://github.com/sandurijal03/color_generator',
    link2: 'https://www.google.com',
    title: 'Random Color Generator',
    text: '',
  },
  {
    id: 4,
    category: 'Graphql',
    image: img2,
    link1: 'https://github.com/sandurijal03/event-booking',
    link2: 'https://www.google.com',
    title: 'Event Booking Api with graphql',
    text: '',
  },
]

export default portfolios
