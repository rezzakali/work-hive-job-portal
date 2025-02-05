import ContactUs from '@/src/clientPages/contact-us';

export const metadata = {
  title: 'Contact Us - WorkShive',
  description:
    'Get in touch with WorkShive for any inquiries, support, or partnership opportunities. We are here to help job seekers and employers.',
  keywords: [
    'contact us',
    'support',
    'job portal',
    'WorkShive',
    'career inquiries',
    'job seekers',
    'employer support',
  ],
  openGraph: {
    title: 'Contact Us - WorkShive',
    description:
      'Reach out to WorkShive for any inquiries, support, or partnership opportunities. Learn more about how we help you connect with talent.',
    url: 'https://workshive.vercel.app/contact-us',
    siteName: 'WorkShive',
    images: [
      {
        url: 'https://workshive.vercel.app/contact-us.png',
        width: 1200,
        height: 630,
        alt: 'Contact Us - WorkShive',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - WorkShive',
    description:
      'Contact WorkShive for inquiries, support, or partnership opportunities. Get in touch to learn more about our services.',
    images: ['https://workshive.vercel.app/contact-us.png'],
  },
};

const page = () => {
  return <ContactUs />;
};

export default page;
