const uppyContainers = document.querySelectorAll('.uppy-uploader-container');

uppyContainers.forEach((uppyContainer, index) => {
  let _form = uppyContainer.querySelector('[data-s3-uppy="form"]');
  let _log = uppyContainer.querySelector('[data-s3-uppy="log"]');

  // Uppy Form Photo-Type
  let form_att = uppyContainer.querySelector('.uppy_custom_media_upload');
  let total_items =  form_att.getAttribute('data-s3-uppy-max-number-of-files');
  let _photo__type = form_att.getAttribute('data-s3-uppy-photo-type');

  console.log("Total Number of Items to be Selected - " + total_items);

  // Obejct-Id for Image
  let _obj_uuid = form_att.getAttribute('data-s3-uppy-object-uuid');
  // const _obj_uuid = document.querySelector('#media_formImg_uuid').value;

  console.log(_photo__type);
  console.log(_obj_uuid);

  let createImage = imageUrl => {
    const img_url = imageUrl;
    // Get logged in user id
    const userId = _form.dataset.s3UppyUserId;
    console.log(imageUrl);
    // Create record for this user with s3 image url
    return fetch('/direct-s3-upload/images/record_create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ direct_url: img_url, obj_uuid: _obj_uuid, photo_type: _photo__type, user_id: userId })
    }).then(response => response.json());
  };

  let uppy = Uppy.Core({
    autoProceed: true,
    restrictions: {
      maxFileSize: 5297152,  // Limit size to 5 MB on the javascript side
      maxNumberOfFiles: total_items,
      allowedFileTypes: ['image/png', 'image/jpeg', 'image/webp', 'video/mp4']
    }
  })
    .use(Uppy.Dashboard, {
      inline: true,
      target: uppyContainer.querySelector('.drag-drop-area'),
      note: 'Images only, up to 3 files, 2MB each',
      width: '100%',
      height: 350
    })
    .use(Uppy.DragDrop)
    .use(Uppy.GoldenRetriever)
    .use(Uppy.AwsS3, {
      getUploadParameters() {
        // 1. Get URL to post to from action attribute
        const _url = _form.getAttribute('action');
        // 2. Create Array from FormData object to make it easy to operate on
        const _formDataArray = Array.from(new FormData(_form));
        // 3. Create a JSON object from array
        const _fields = _formDataArray.reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});

        // 4. Return resolved promise with Uppy. Uppy it will add file in file param as the last param
        return Promise.resolve({
          method: 'POST',
          url: _url,
          fields: _fields
        });
      }
    });

  uppy.on('upload-success', (_file, data) => {
    const li = document.createElement('li');
    li.textContent = data.body.location;
    _log.appendChild(li);
  });

  uppy.on('complete', ({ failed, successful }) => {
    /*
      For every successfully uploaded image to S3, send request to the Instance
      that will create a record with the uploaded image's URL as direct_url param.
    */
    Promise.all(successful.map(({ response }) => createImage(response.body.location)))
    .then(() => {
      // Show confirmation box (SweetAlert2) after all the images has been created
      Swal.fire({
        title: 'Images uploaded',
        icon: 'success',
        text: 'Press refresh to display the results',
        confirmButtonText: 'Refresh',
        showCloseButton: true
      }).then(result => {
        if (!result.value) {
          return;
        }

        // Reload page after "Refresh" button has been clicked inside Sweet Alert2
        window.location.reload();
      });
    });
  });
});