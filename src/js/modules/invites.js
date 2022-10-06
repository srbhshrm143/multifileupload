function validEmail(email) {
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const fetchUsers = async (query, skip_profile_ids) => {
  if (query.length < 3) {
    return [];
  }

  const r = await fetch(`/api/users/search.json?query=${query}&skip=${skip_profile_ids}`);
  if (r.ok) {
    const json = await r.json();
    return json.results
      .filter(u => u.profile)
      .map(u => {
        let photo;
        let name;
        if (u.profile.avatar)
          photo = u.profile.avatar.photo.versions.sm;

        if(u.profile.name)
          name = `${u.profile.first_name} ${u.profile.last_name} (${u.profile.name})`;
        else
          name = `${u.profile.first_name} ${u.profile.last_name}`;

        return {
          displayName: "",
          email: u.email,
          name:  name,
          photo: photo
        };
      });
  }
  else
    return [];
};

class MSet {
  constructor(arr) {
    this.items = arr || [];
  }

  add(o){
    if (!this.has(o))
      this.items = [...this.items, o];

    return this.items;
  }

  delete(o){
    this.items = this.items.filter(i => i.email !== o.email);
    return this.items;
  }

  has(o){
    return this.items.map(i => i.email).includes(o.email);
  }
}

window.invites = function () {
  return {
    query: "",
    skip_profile_ids: "",

    selected: new MSet(),
    suggestions: new MSet(),
    sourceSuggestions: [],
    showSuggestions: false,

    initManual({emails}){
      this.selected = new MSet(emails.map((email) => { return { displayName: email, email: email }; }));
    },

    prepareSuggestions(){
      const list = this.sourceSuggestions.filter(u => !this.selected.has(u));

      this.suggestions = new MSet(list);

      if (validEmail(this.query) && !this.selected.has({email: this.query}))
        this.suggestions.add(this.build(this.query));
    },

    async loadSuggestions() {
      this.sourceSuggestions = await fetchUsers(this.query, this.skip_profile_ids);
      this.prepareSuggestions();
    },

    register(entry){
      this.selected.add(entry);
      this.clear();
    },

    remove(entry){
      this.selected.delete(entry);
      this.prepareSuggestions();
    },

    clear(){
      this.query = "";
      this.suggestions = new MSet();
    },

    emailList(){
      return this.selected.items.map(e => e.email).join(",");
    },

    build(email) {
      return {
        displayName: email, email: email, name: "Not registerd yet (send invite)", exists: false
      };
    }
  };
};
