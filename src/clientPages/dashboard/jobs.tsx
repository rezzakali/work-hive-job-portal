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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { useToast } from '@/src/hooks/use-toast';
import { Edit3, EllipsisVertical, MoreHorizontal, Trash2 } from 'lucide-react';
import { startTransition, useState } from 'react';
import { JobInterface } from '../home/home.interface';
import EditJobDialog from './edit-job-dialog';
import JobDetailsDialog from './job-details';

const Jobs = ({ jobs }: { jobs: JobInterface[] }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobInterface | null>(null);

  const { toast } = useToast();

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
      {jobs?.length > 0 && (
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
            {jobs.length > 0 ? (
              jobs.map((job: JobInterface) => (
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
                            setDetailsDialogOpen(true);
                          }}
                        >
                          <EllipsisVertical className="mr-2 w-4 h-4" />
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedJob(job);
                            setEditDialogOpen(true);
                          }}
                        >
                          <Edit3 className="mr-2 w-4 h-4" /> Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedJob(job);
                            setCloseDialogOpen(true);
                          }}
                          disabled={job.status === 'closed'}
                        >
                          <Trash2 className="mr-2 w-4 h-4" /> Close
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
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
      {detailsDialogOpen && (
        <JobDetailsDialog
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          job={selectedJob!}
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
