import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import AWSS3 from '@uppy/aws-s3';
import Webcam from '@uppy/webcam';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';

const photosLoad = async (uppy, photos) => {
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const response = await fetch(photo.photo.url);
    const blob = await response.blob();
    uppy.addFile({
      name: photo.photo.file_name,
      type: blob.type,
      data: blob,
      meta: { photoId: photo.id },
      remote: true
    });
  }
  uppy.getFiles().forEach(file => {
    uppy.setFileState(file.id, {
      progress: { uploadComplete: true, percentage: 100, uploadStarted: Date.now() }
    });
  });
};

const setupPhotoUpload = async (form, targetSelector, photos) => {
  const maxNumberOfFiles = form.dataset.s3UppyMaxNumberOfFiles;
  const disabled = form.dataset.s3UppyDisabled;
  const note = form.dataset.s3UppyNote;
  photos = photos || JSON.parse(form.dataset.s3UppyPhotos || '[]') || [];
  const target = targetSelector || form.dataset.s3UppyTarget;

  const uppy = new Uppy({
    autoProceed: photos.length == 0,
    restrictions: {
      maxFileSize: 2097152, // Limit size to 2 MB on the javascript side
      maxNumberOfFiles: maxNumberOfFiles,
      allowedFileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
    },
  });

  uppy.use(Dashboard,
    {
      inline: true,
      replaceTargetContent: true,
      showProgressDetails: true,
      target: target,
      note: note,
      width: '100%',
      height: 300,
      proudlyDisplayPoweredByUppy: false,
      showRemoveButtonAfterComplete: !disabled,
      hideCancelButton: disabled,
      hideUploadButton: disabled,
      doneButtonHandler: null,
      locale: {
        strings: {
          dropPasteImport: 'Drag & drop, paste, or %{browse} to upload file',
          browse: 'browse your computer',
        },
      },
    })
    .use(Webcam, { target: Dashboard, modes: ['picture'] })
    .use(AWSS3, {
      getUploadParameters() {
        const _url = form.getAttribute('action');
        const _formDataArray = Array.from(new FormData(form));
        const _fields = _formDataArray.reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});

        // 4. Return resolved promise with Uppy. Uppy it will add file in file param as the last param
        return Promise.resolve({
          method: 'POST',
          url: _url,
          fields: _fields,
        });
      },
    });

  document.addEventListener('photo-upload-reset', () => {
    uppy.reset();
  });

  await photosLoad(uppy, photos);
  return uppy;
};

export default setupPhotoUpload;
