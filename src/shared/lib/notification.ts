import { toast } from 'react-hot-toast';

type NotificationType = 'success' | 'error' | 'info';

export const notify = (message: string, type: NotificationType = 'info') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast(message);
      break;
    default:
      toast(message);
  }
};

