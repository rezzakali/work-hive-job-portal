import { addResume } from '@/src/app/actions';
import { Button } from '@/src/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useToast } from '@/src/hooks/use-toast';
import { RootState } from '@/src/redux/store';
import { ChangeEvent, useState, useTransition } from 'react';
import { useSelector } from 'react-redux';

const AddUpdateResume = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant={'outline'} size={'sm'} onClick={() => setOpen(true)}>
        Add resume
      </Button>
      {open && <UploadResume open={open} setOpen={setOpen} />}
    </div>
  );
};

export default AddUpdateResume;

export function UploadResume({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useSelector((state: RootState) => state.users);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFile(file);
    } else {
      toast({ title: 'Warning', description: 'Please upload a PDF file.' });
    }
  };

  const handleUpload = async () => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('file', file!);
        formData.append('email', user!.email);
        const res = await addResume(formData);
        if (res && res.success) {
          toast({
            title: 'Success',
            description: res.message || 'Resume added successfully!',
          });
          setFile(null);
          setOpen(false);
        }
      } catch (error: any) {
        try {
          const parsedError = JSON.parse(error.message);
          toast({
            title: 'Error',
            description:
              parsedError.message || 'An error occurred during signup.',
          });
        } catch (parseError) {
          // Handle unexpected errors
          toast({
            title: 'Server error',
            description: 'An unexpected error occurred.',
          });
        }
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload your resume</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="resume" className="sr-only">
              File (PDF only)
            </Label>
            <Input
              id="resume"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              disabled={isPending}
              className="cursor-pointer"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={isPending}
          >
            {isPending ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
