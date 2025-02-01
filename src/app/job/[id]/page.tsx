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
      url: `https://yourwebsite.com/job.data/${id}`,
      type: 'article',
      images: [
        {
          url: 'https://yourwebsite.com/work-hive-banner.png',
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
      images: 'https://yourwebsite.com/work-hive-banner.png',
    },
  };
}

const page = async ({ params }: JobPageProps) => {
  const { id } = await params;
  const job = await getJob({ id });
  const appliedStatus = await checkApplication(id);
  return <JobDetails job={job.data} applied={appliedStatus.data} />;
};

export default page;
