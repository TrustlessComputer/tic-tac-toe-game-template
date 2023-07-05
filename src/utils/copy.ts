import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';

const onCopy = (text: string | undefined) => {
  if (!text) return;
  copy(text);
  toast.success('Copied');
};

export default onCopy;
