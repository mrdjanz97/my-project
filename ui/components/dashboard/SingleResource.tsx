import { createDownloadLink } from '@root/src/lib/utils/create_download_link';
import { EDIT_RESOURCE, FILE, REMOVE_RESOURCE } from './const';
import { useTranslation } from 'react-i18next';
import { DOWNLOAD, GOOGLE_FAVICON_GETTER } from '../common/const/consts';
import { downloadResource } from '@root/src/lib/core/company_resources/company_resources.service';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DotsVertical } from '../../icons/index';
import RemoveCompanyResourceModal from './RemoveCompanyResourceModal';
import { useState } from 'react';
import EditCompanyResourceModal from './EditCompanyResourceModal';
import { Popover } from '@mui/material';

const SingleResource = ({ resource }: any) => {
  const { t } = useTranslation();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const faviconUrl = GOOGLE_FAVICON_GETTER + resource.link;

  const downloadFile = async fileName => {
    const data = await downloadResource({ fileName });

    createDownloadLink({
      data,
      fileName,
    });
  };

  const renderActionButton = () => {
    return resource.type === FILE ? (
      <button onClick={() => downloadFile(resource.link)}>
        {resource.title} ({t(DOWNLOAD)})
      </button>
    ) : (
      <a href={resource.link}>{resource.title}</a>
    );
  };

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
    handleClosePopover();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    handleClosePopover();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="flex rounded-md bg-white shadow-sm justify-between w-full p-2 items-center">
      <div className="flex gap-2 items-center">
        <div className="avatar static">
          <div className="w-10">
            <img src={faviconUrl} />
          </div>
        </div>
        {renderActionButton()}
      </div>
      <div className="text-xs text-gray-500">
        <button onClick={handleClick} className="p-2">
          <DotsVertical />
        </button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <div className="flex flex-col gap-2 p-2">
            <span className="cursor-pointer" onClick={() => handleClickOpen()}>
              {t(REMOVE_RESOURCE)}
            </span>
            <span className="cursor-pointer" onClick={() => setOpenEdit(true)}>
              {t(EDIT_RESOURCE)}
            </span>
          </div>
        </Popover>
      </div>
      <RemoveCompanyResourceModal
        resource={resource}
        dialogOpen={openDelete}
        dialogClose={handleClose}
        closePopover={handleClosePopover}
      />
      <EditCompanyResourceModal
        resource={resource}
        openEdit={openEdit}
        closeEdit={handleCloseEdit}
        closePopover={handleClosePopover}
      />
    </div>
  );
};

export default SingleResource;
