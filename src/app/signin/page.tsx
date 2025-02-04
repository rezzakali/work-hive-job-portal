import Signin from '@/src/clientPages/signin';

export const metadata = {
  title: 'Sign In | WorkShive',
  description:
    'Access your WorkShive account to explore job opportunities, manage applications, and connect with employers.',
  keywords:
    'WorkShive, sign in, login, job portal, job search, employer login, employee portal',
  robots: 'index, follow',
  openGraph: {
    title: 'Sign In | WorkShive',
    description:
      'Log in to your WorkShive account and manage your job applications seamlessly.',
    url: 'https://workshive.vercel.app/signin',
    type: 'website',
    images: [
      {
        url: 'https://workshive.vercel.app/signin-preview.png',
        width: 1200,
        height: 630,
        alt: 'WorkShive Sign-In Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In | WorkShive',
    description:
      'Log in to WorkShive to access job opportunities and applications.',
    images: ['https://workshive.vercel.app/signin-preview.png'],
  },
};

const page = () => {
  return <Signin />;
};

export default page;
