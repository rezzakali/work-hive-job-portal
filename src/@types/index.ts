export interface NotificationInterface {
  _id: string;
  jobId: string;
  message: string;
  type: string;
  isReadBy: string[];
  createdAt: string;
}
