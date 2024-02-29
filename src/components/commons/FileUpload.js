import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import { fileUpload } from '../../api/file/file';
import { Btn } from './ButtonStyle';

const MessageBox = loadable(() => import('./ErrorMsgStyle'));

const FileUpload = ({
  gid,
  location,
  imageOnly,
  singleFile,
  fileUploadCallback,
  children,
}) => {
  const [message, setMessage] = useState(''); // 에러 메세지

  const { t } = useTranslation();

  const onClick = useCallback(() => {
    const fileEl = document.createElement('input');
    fileEl.type = 'file';
    fileEl.multiple = singleFile ? false : true;
    fileEl.click();

    fileEl.addEventListener('change', (e) => {
      try {
        const files = e.target.files;

        if (!gid || !gid.trim()) {
          throw new Error(t('잘못된_접근입니다.'));
        }

        if (imageOnly) {
          // 이미지 전용
          for (const file of files) {
            if (file.type.indexOf('image/') === -1) {
              // 이미지가 아닌 파일
              throw new Error(t('이미지만_업로드_가능합니다.'));
            }
          }
        }

        const formData = new FormData();
        formData.append('gid', gid);
        if (location) formData.append('location', location);
        if (imageOnly) formData.append('imageOny', true);
        if (singleFile) formData.append('singleFile', true);

        for (const file of files) {
          formData.append('file', file);
        }

        /* 파일 전송 처리 */
        fileUpload(formData)
          .then((files) => {
            if (typeof fileUploadCallback === 'function') {
              fileUploadCallback(files);
            }
          })
          .catch((err) => setMessage(err.message));

        setMessage('');
      } catch (err) {
        setMessage(() => err.message);
        fileEl.value = '';
      }
    });
  }, [singleFile, imageOnly, t, gid, location, fileUploadCallback]);

  return (
    <>
      <Btn type='button' onClick={onClick} className='file_upload_btn'>
        {children}
      </Btn>
      {message && <MessageBox>{message}</MessageBox>}
    </>
  );
};

export default React.memo(FileUpload);
