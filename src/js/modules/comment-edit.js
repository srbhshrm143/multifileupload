import apiFetch from '../apiFetch';

window.commentEdit = () => {
  return {
    showEdit: false,
    spinner: false,

    submit(event) {
      event.preventDefault();

      const form = event.target;

      const formData = new FormData(form);
      const body = JSON.stringify(Object.fromEntries(formData));

      apiFetch('/api/comments', {
        method: 'PUT',
        body: body
      }).then((result) => { 
        if (result.errors){
          this.showEdit = false;
          return console.error(result.errors);
        }

        this.$refs.comment.innerHTML = result.comment_body;
        this.showEdit = false;
        this.spinner = false;
      });
    }
  };
};
