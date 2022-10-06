window.frames = function (){
  return {
    frame: null,
    spinner: false,
    upload: false,
    error: false,

    async insert({target, where}) {
      selector = `[x-frames-target="${target}"]`;
      targetEl = document.querySelector(`[x-frames-target="${target}"]`);

      let res = await this.submit();
      if (res)
        targetEl.insertAdjacentHTML(where, this.frame);

      window.dispatchEvent(new CustomEvent("frame-rendered", { detail: { scope: selector }}));
    },

    async replace({target}) {
      selector = `[x-frames-target="${target}"]`;
      targetEl = document.querySelector(`[x-frames-target="${target}"]`);

      let res = await this.submit();
      if (res)
        targetEl.innerHTML = this.frame;

      window.dispatchEvent(new CustomEvent("frame-rendered", { detail: { scope: selector }}));
    },

    async send(path, method, data) {
      const options = { method: method };
      if (method === 'POST') {
        options.body = data;
      } else {
        path += '?' + (new URLSearchParams(data)).toString();
      }
      const response = await fetch(path, options);
      const text = await response.text();
      if (response.ok){
        this.frame = text;
      } else {
        this.error = text;
      }
      this.spinner = false;
      return response.ok;
    },

    async submit() {
      this.spinner = true;
      this.error = false;
      const form = this.$refs.form;
      let formData = new FormData(form);
      const refs = this.$refs;
      if (refs.form.checkValidity()) {
        let url = form.action;
        if (!url.includes('frame')) url = `${url}.frame`;
        let res = await this.send(url, form.method, formData);
        if (res) {
          if (form.method.toUpperCase() === 'POST') refs.form.reset();
        } else {
          new api.flash('error', this.error);
        }

        return res;
      }
    },

    sizeTextarea(focus){
      if(focus && !this.$refs.content.value.length){
        this.$refs.content.classList.add('h-28');
        this.$refs.content.classList.remove('h-11');
      }
      else if(!focus && !this.$refs.content.value.length){
        this.$refs.content.classList.add('h-11');
        this.$refs.content.classList.remove('h-28');
      }
    }
  };
};
