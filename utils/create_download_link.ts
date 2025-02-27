import { DOWNLOAD } from '../ui/components/common/const/consts';

export const createDownloadLink = ({ data, fileName }) => {
  const url = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(DOWNLOAD, fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};
