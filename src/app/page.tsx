import { getJobs, getProfile } from '@/src/app/actions';
import Home from '@/src/clientPages/home';

export const metadata = {
  title: 'Work Hive - Find Your Dream Job',
  description:
    'Work Hive is a modern job portal that connects talented professionals with top companies. Find, apply, and secure your dream job today!',
  keywords: [
    'jobs',
    'job portal',
    'hiring',
    'career',
    'employment',
    'work hive',
    'remote jobs',
    'freelance work',
    'tech jobs',
  ],
  openGraph: {
    title: 'Work Hive - Find Your Dream Job',
    description:
      'Work Hive is your go-to platform for finding and applying for top job opportunities. Start your career journey today!',
    url: 'https://workshive.netlify.app/',
    siteName: 'Work Hive',
    images: [
      {
        url: '/work-hive-banner.png', // Replace with actual image path
        width: 1200,
        height: 630,
        alt: 'Work Hive Job Portal',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work Hive - Find Your Dream Job',
    description:
      'Join Work Hive to explore top job opportunities and kickstart your career today!',
    images: ['/work-hive-banner.png'], // Replace with actual image path
  },
  robots: 'index, follow',
};

const page = async (props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    limit?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const search = searchParams?.search || '';
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  const jobs = await getJobs({ search, page, limit });

  const totalPages = Math.ceil(jobs.count / limit);
  const profile = await getProfile();

  return (
    <Home jobs={jobs.data} totalPages={totalPages} profile={profile.data} />
  );
};

export default page;
