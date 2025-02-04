import Signup from '@/src/clientPages/signup';

export const metadata = {
  title: 'Sign Up | WorkShive',
  description:
    'Create a WorkShive account to explore job opportunities, apply for positions, and connect with top employers.',
  keywords:
    'WorkShive, sign up, register, job portal, create account, job search, employer, employee',
  robots: 'index, follow',
  openGraph: {
    title: 'Sign Up | WorkShive',
    description:
      'Join WorkShive and access thousands of job opportunities tailored to your skills.',
    url: 'https://workshive.vercel.app/signup',
    type: 'website',
    images: [
      {
        url: 'https://workshive.vercel.app/signup-preview.png',
        width: 1200,
        height: 630,
        alt: 'WorkShive Sign-Up Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Up | WorkShive',
    description:
      'Create your WorkShive account and unlock job opportunities that match your skills.',
    images: ['https://workshive.vercel.app/signup-preview.png'],
  },
};

const page = () => {
  return <Signup />;
};

export default page;
