'use client';

import { Job } from '@/src/components/job-card';

import PaginationComponent from '@/src/components/PaginationComponent';
import { Input } from '@/src/components/ui/input';
import { setUser } from '@/src/redux/user/userSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { ProfileInterface } from '../profile/profile.interface';
import { JobInterface } from './home.interface';

export default function Home({
  jobs,
  totalPages,
  profile,
}: {
  jobs: JobInterface[];
  totalPages: number;
  profile: ProfileInterface;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      dispatch(setUser(profile));
    }
  }, [profile]);

  return (
    <div className="py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold capitalize text-center">
          find you dream job
        </h1>
        <p className="text-center">
          Looking for job? Browse our latest job openings to view & apply to the
          best job today!
        </p>
      </div>
      <div className="flex items-center justify-center w-full max-w-lg mx-auto">
        <Input
          placeholder="Search jobs..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      {jobs.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-start">Recent jobs</h2>
          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <Job key={index} {...job} />
            ))}
          </div>
          <PaginationComponent totalPages={totalPages} />
        </div>
      ) : (
        <div>
          <p className="text-center">No jobs found!</p>
        </div>
      )}
    </div>
  );
}
