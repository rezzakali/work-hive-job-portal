import { checkApplication, getJob } from '@/src/app/actions';
import JobDetails from '@/src/clientPages/job-details';
import { Metadata } from 'next';

interface JobPageProps {
  params: { id: string };
}

// Correctly define the function parameter type
export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob({ id });

  if (!job) {
    return {
      title: 'Job Not Found',
      description: 'The requested job does not exist.',
    };
  }

  return {
    title: `${job.data.title} - ${job.data.company}`,
    description: job.data.description?.slice(0, 150) + '...', // Limit description
    openGraph: {
      title: `${job.data.title} - ${job.data.company}`,
      description: job.data.description?.slice(0, 150) + '...',
      url: `https://workshive.vercel.app/${id}`,
      type: 'article',
      images: [
        {
          url: 'https://workshive.vercel.app/work-hive-banner.png',
          width: 800,
          height: 600,
          alt: job.data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.data.title} - ${job.data.company}`,
      description: job.data.description?.slice(0, 150) + '...',
      images: 'https://workshive.vercel.app/work-hive-banner.png',
    },
  };
}

const page = async ({ params }: JobPageProps) => {
  try {
    const { id } = await params;
    const appliedStatus = await checkApplication(id);
    const job = await getJob({ id });
    return <JobDetails job={job.data} applied={appliedStatus.data} />;
  } catch (error: any) {
    return <div>Failed to load job details.</div>;
  }
};

export default page;
