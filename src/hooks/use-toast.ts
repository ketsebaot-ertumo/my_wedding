
// /hooks/use-toast.ts

import { toast } from 'sonner';

export const useToast = () => {
  return {
    success: (msg: string) => toast.success(msg),
    error: (msg: string) => toast.error(msg),
    info: (msg: string) => toast(msg),
  };
};




// hooks/use-toast.ts
// import { useState } from 'react';

// export function useToast() {
//   const [message, setMessage] = useState<string | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   const showToast = (msg: string) => {
//     setMessage(msg);
//     setIsVisible(true);
//     setTimeout(() => setIsVisible(false), 3000);
//   };

//   return { message, isVisible, showToast };
// }
