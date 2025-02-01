'use client';

import { archiveJob } from '@/src/app/actions';
import ConfirmationDialog from '@/src/components/confirmation-dialog';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { Skeleton } from '@/src/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { useToast } from '@/src/hooks/use-toast';
import { useFetchJobsQuery } from '@/src/redux/jobs/jobsApi';
import { Edit3, MoreHorizontal, Trash2 } from 'lucide-react';
import { startTransition, useState } from 'react';
import { JobInterface } from '../home/home.interface';
import EditJobDialog from './edit-job-dialog';

const Jobs = ({ userId }: { userId: string }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobInterface | null>(null);

  const { toast } = useToast();

  const {
    isError,
    isLoading,
    isSuccess,
    data: jobs,
  } = useFetchJobsQuery(userId);

  if (isLoading) {
    return <JobsSkeleton />;
  }

  if (!isLoading && isError) {
    return <div>Something went wrong!</div>;
  }
  if (!isLoading && !isError && jobs?.data?.length === 0) {
    return <div>No jobs found!</div>;
  }

  // Handle close/archive job
  const handleCloseJob = async () => {
    startTransition(async () => {
      try {
        const res = await archiveJob(selectedJob!._id);
        toast({
          title: 'Success',
          description: res.message || 'Job closed/archived successfully',
        });
        setCloseDialogOpen(false);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to close/archive job',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div>
      {isSuccess && Array.isArray(jobs.data) && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Emp.Type</TableHead>
              <TableHead>Exp.</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.data.length > 0 ? (
              jobs.data.map((job: JobInterface) => (
                <TableRow key={job._id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>{job.employmentType}</TableCell>
                  <TableCell>{job.experienceLevel}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        job.status === 'open' ? 'secondary' : 'destructive'
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedJob(job);
                            setCloseDialogOpen(true);
                          }}
                          disabled={job.status === 'closed'}
                        >
                          <Trash2 className="mr-2 w-4 h-4" /> Close
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedJob(job);
                            setEditDialogOpen(true);
                          }}
                        >
                          <Edit3 className="mr-2 w-4 h-4" /> Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No jobs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {editDialogOpen && selectedJob && (
        <EditJobDialog
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
          job={selectedJob}
        />
      )}
      <ConfirmationDialog
        open={closeDialogOpen}
        onOpenChange={setCloseDialogOpen}
        title="Close/Archive Job"
        description="Are you sure you want to close or archive this job? This action cannot be undone."
        onConfirm={handleCloseJob}
        confirmButtonText="Close/Archive"
      />
    </div>
  );
};

export default Jobs;

// Skeleton Loader Component
const JobsSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Company</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Salary</TableHead>
        <TableHead>Employment Type</TableHead>
        <TableHead>Experience Level</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-28" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-10 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
