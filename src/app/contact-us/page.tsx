import ContactUs from '@/src/clientPages/contact-us';

export const metadata = {
  title: 'Contact Us - Work Hive',
  description:
    'Get in touch with Work Hive for any inquiries, support, or partnership opportunities. We’re here to help job seekers and employers.',
  keywords: [
    'contact us',
    'support',
    'job portal',
    'Work Hive',
    'career inquiries',
    'job seekers',
    'employer support',
  ],
  openGraph: {
    title: 'Contact Us - Work Hive',
    description:
      'Reach out to Work Hive for any inquiries, support, or partnership opportunities. Learn more about how we help you connect with talent.',
    url: 'https://workshive.netlify.app/contact-us', // Replace with your actual URL
    siteName: 'Work Hive',
    images: [
      {
        url: 'https://workshive.netlify.app/contact-us.png', // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: 'Contact Us - Work Hive',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Work Hive',
    description:
      'Contact Work Hive for inquiries, support, or partnership opportunities. Get in touch to learn more about our services.',
    images: ['https://workshive.netlify.app/contact-us.png'], // Replace with your actual image URL
  },
};

const page = () => {
  return <ContactUs />;
};

export default page;
