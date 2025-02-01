'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const ConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelButtonText}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
