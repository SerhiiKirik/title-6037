import { BookingPage } from '@/pages/booking';
import {
  generateMetadata as generateSeoMetadata,
  SEO_DEFAULTS,
} from '@/entities/seo';

export const metadata = generateSeoMetadata(
  {
    url: `${SEO_DEFAULTS.siteUrl}/`,
    title: 'Book Your Session - Booking Session',
    metaDescription:
      'Select your preferred date and time slot to book your session. Available slots from today up to 6 weeks in advance.',
    robots: true,
  },
  SEO_DEFAULTS,
);

const Home = () => <BookingPage />;

export default Home;
