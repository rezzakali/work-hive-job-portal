'use client';

import { applyJob } from '@/src/app/actions';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useToast } from '@/src/hooks/use-toast';
import moment from 'moment';
import { useState, useTransition } from 'react';
import { JobInterface } from '../home/home.interface';

export default function JobDetails({
  job,
  applied,
}: {
  job: JobInterface;
  applied: boolean;
}) {
  const {
    _id,
    company,
    createdAt,
    description,
    employmentType,
    experienceLevel,
    location,
    salary,
    skills,
    status,
    title,
  } = job || {};

  const [showApplyForm, setShowApplyForm] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  if (!job) {
    return <div className="container mx-auto py-8">Job not found</div>;
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', resume!);
    formData.append('jobId', _id);

    startTransition(async () => {
      try {
        const res = await applyJob(formData);
        toast({
          title: 'Success',
          description: res.message || 'Application submitted successfully!',
        });
        setResume(null);
        setShowApplyForm(false);
      } catch (error: any) {
        try {
          const parsedError = JSON.parse(error.message);
          toast({
            title: 'Error',
            description:
              parsedError.message || 'An error occurred during apply job.',
          });
          setResume(null);
        } catch (parseError) {
          // Handle unexpected errors
          toast({
            title: 'Server error',
            description: 'An unexpected error occurred.',
          });
          setResume(null);
        }
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== 'application/pdf') {
      toast({ title: 'Error', description: 'Only PDF files are allowed.' });
      setResume(null);
      return;
    }
    setResume(file);
  };

  return (
    <div className="py-8 w-full">
      <Card className="w-full">
        <CardHeader className="pb-2 ">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            <p className="text-sm text-gray-400">
              {moment(createdAt).fromNow()}
            </p>
          </div>
          <div className="mt-1 flex flex-wrap items-center space-x-2 text-sm text-muted-foreground">
            <span className="font-medium">{company}</span>
            <span>•</span>
            <span>{location}</span>
            <span>•</span>
            <Badge variant={'secondary'}>{employmentType}</Badge>
            <span>•</span>
            <span className="font-semibold ">{salary}k/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-3">{description}</p>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between my-3">
            <div>
              <h4 className="text-sm font-medium"> Experience Level :</h4>{' '}
              <Badge variant="outline" className="mt-1">
                {experienceLevel}
              </Badge>
            </div>
            <Button
              onClick={() => setShowApplyForm(!showApplyForm)}
              disabled={applied}
            >
              {applied
                ? 'Already Applied'
                : showApplyForm
                ? 'Cancel'
                : 'Apply Now'}
            </Button>
          </div>
          {showApplyForm && (
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <Label htmlFor="resume">Resume (Optional)</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Loading...' : 'Submit Application'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
