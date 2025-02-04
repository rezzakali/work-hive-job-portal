'use client'; // Mark the component as a Client Component

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog'; // Adjust the import path
import { JobInterface } from '../home/home.interface';

interface JobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobInterface;
}

const JobDetailsDialog = ({
  open,
  onOpenChange,
  job,
}: JobDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
          <DialogDescription>
            {job.company} - {job.location}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Job Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Salary</p>
              <p>{job.salary} k/month</p>
            </div>
            <div>
              <p className="font-semibold">Employment Type</p>
              <p>{job.employmentType}</p>
            </div>
            <div>
              <p className="font-semibold">Experience Level</p>
              <p>{job.experienceLevel}</p>
            </div>
            <div>
              <p className="font-semibold">Skills</p>
              <p>{job.skills?.join(', ')}</p>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <p className="font-semibold">Description</p>
            <p>{job.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
