class StripeElements {
  constructor() {
    this.form = document.getElementsByClassName('create_account')[0];
    this.tokenField = document.querySelector('[data-external-account]');
    this.stripe = Stripe(stripe_pk);
    this.elements = this.stripe.elements();
    this.configure();
  }

  configure() {
    // Custom styling can be passed to options when creating an Element.

    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    // Create an instance of the card Element.
    this.card = this.elements.create('card', {style});

    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount('#card-element');
    console.log('mounted');

    this.validateForm();
  }

  getToken() {
    return new Promise((resolve, reject) => {
      this.stripe
        .createToken(this.card, {
          currency: 'usd',
        })
        .then(
          function(result) {
            if (result.error) {
              // Inform the customer that there was an error.
              const errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
              reject();
            } else {
              this.tokenField.value = result.token.id;
              resolve();
            }
          }.bind(this),
        );
    });
  }

  validateForm() {
    this.card.addEventListener('change', ({error}) => {
      const displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });
  }
}

class StripePerson {
  constructor(container) {
    this.container = container;
    this.personId = this.container.dataset.person;
    this.accountId = this.container.dataset.account;
    this.processInputData();

    let frontFilePromise = this.setPersonDocument('front');
    let backFilePromise = this.setPersonDocument('back');

    return new Promise((resolve, reject) => {
      Promise.all([frontFilePromise, backFilePromise]).then(
        () => {
          this.removeEmptyValues(this.personData);
          console.log('this.personData', this.personData);
          stripe.createToken('person', this.personData).then(
            function(result) {
              if (result.error) {
                this.container.querySelector('.errors').textContent =
                  result.error.message;
                reject();
              } else {
                this.token = result.token.id;
                this.savePerson()
                  .then(resp => resp.json())
                  .then(
                    function(result) {
                      if (result.status == 200) {
                        resolve();
                      } else {
                        this.container.querySelector(
                          '.errors',
                        ).textContent = JSON.parse(result.body).error.message;
                        reject();
                      }
                    }.bind(this),
                  );
              }
            }.bind(this),
          );
        },
        error => {
          console.log(error);
        },
      );
    });
  }

  savePerson() {
    const data = new FormData();
    data.append('person_token', this.token);
    data.append('account_id', this.accountId);
    data.append('person_id', this.personId);

    return fetch('/payments/api/persons.json', {
      method: 'POST',
      body: data,
    });
  }

  setPersonDocument(side) {
    let documentFile = this.container.querySelector(`[data-${side}-photo-id]`)
      .files[0];
    if (documentFile == undefined) return Promise.resolve();

    return this.processFile(documentFile, side);
  }

  setDocumentToken(side, token) {
    console.log('Setting document token', token);
    if (this.personData.person.verification == undefined) {
      this.personData.person.verification = {document: {}};
    }
    this.personData.person.verification.document[side] = token;
  }

  processFile(file, side) {
    console.log('Processing file with', stripe._apiKey);
    const data = new FormData();
    data.append('file', file);
    data.append('purpose', 'identity_document');
    console.log('REQUEST', data);

    return new Promise((resolve, reject) => {
      fetch('https://uploads.stripe.com/v1/files', {
        method: 'POST',
        headers: {Authorization: `Bearer ${stripe._apiKey}`},
        body: data,
      })
        .then(fileResponse => fileResponse.json())
        .then(
          function(json) {
            this.setDocumentToken(side, json.id);
            resolve();
          }.bind(this),
        );
    });
  }

  removeEmptyValues(obj) {
    for (var i in obj) {
      if (obj[i] === null || obj[i].length == 0) {
        delete obj[i];
      } else if (typeof obj[i] === 'object') {
        this.removeEmptyValues(obj[i]);
      }
    }
  }

  processInputData() {
    this.personData = {
      person: {
        first_name: this.container.querySelector('[data-first-name]').value,
        last_name: this.container.querySelector('[data-last-name]').value,
        phone: this.container.querySelector('[data-phone]').value,
        address: {
          line1: this.container.querySelector('[data-address]').value,
          city: this.container.querySelector('[data-city]').value,
          state: this.container.querySelector('[data-state]').value,
          postal_code: this.container.querySelector('[data-zip]').value,
        },
      },
    };

    let idNumberField = this.container.querySelector('[data-id-number]');
    if (idNumberField) {
      this.personData.person.id_number = idNumberField.value;
    }

    let dobValue = this.container.querySelector('[data-date-of-birth]').value;
    if (dobValue.length != 0) {
      let dob = dobValue.split('/');
      this.personData.person.dob = {};
      if (dob[0] != undefined) this.personData.person.dob.day = dob[0];
      if (dob[1] != undefined) this.personData.person.dob.month = dob[1];
      if (dob[2] != undefined) this.personData.person.dob.year = dob[2];
    }
  }
}

// Assumes you've already included Stripe.js!
const stripe = Stripe(stripe_pk);
console.log(stripe_pk);
const myForm = document.querySelector('.create_account');
const element = new StripeElements();
myForm.addEventListener('submit', handleForm);

const resolvedPromise = msg => {
  console.log('RESOLVED PROMISE', msg);
  return Promise.resolve(msg);
};

const processExternalAccountCard = () => {
  let debit_fieldset = document.querySelector('.debit_external_account');

  if (debit_fieldset == null || debit_fieldset.hasAttribute('disabled'))
    return resolvedPromise('External Account Disabled');

  let cc_fieldset = document.querySelector('.cc_fields');
  if (cc_fieldset == null || cc_fieldset.hasAttribute('disabled'))
    return resolvedPromise('External Account Disabled');

  return element.getToken();
};

const processExternalAccount = () => {
  let bank_account_container = document.querySelector('.external_account');

  if (
    bank_account_container == null ||
    bank_account_container.hasAttribute('disabled')
  )
    return resolvedPromise('External Account Disabled');

  let bank_account = {
    country: bank_account_container.querySelector('[data-country]').value,
    currency: bank_account_container.querySelector('[data-currency]').value,
    account_number: bank_account_container.querySelector(
      '[data-account-number]',
    ).value,
    account_holder_name: bank_account_container.querySelector(
      '[data-account-holder-name]',
    ).value,
    account_holder_type: bank_account_container.querySelector(
      '[data-account-holder-type]',
    ).value,
  };

  let routingNumberInput = bank_account_container.querySelector(
    '[data-routing-number]',
  );
  if (routingNumberInput) {
    bank_account.routing_number = routingNumberInput.value;
  }

  removeEmptyValues(bank_account);
  return stripe
    .createToken('bank_account', bank_account)
    .then(function(result) {
      if (result.error) {
        console.log('THEN', result.error);
        document.querySelector('.external_account .errors').textContent =
          result.error.message;
        return Promise.reject();
      } else {
        console.log('YAY SETTING TOKEN', result.token.id);
        document.querySelector('[data-external-account]').value =
          result.token.id;
        return resolvedPromise('Bank Account Set');
      }
    })
    .catch(function(result) {
      console.log('CATCH', result);
      return Promise.reject();
    });
};

const removeEmptyValues = obj => {
  for (var i in obj) {
    if (obj[i] === null || obj[i].length == 0) {
      delete obj[i];
    } else if (typeof obj[i] === 'object') {
      this.removeEmptyValues(obj[i]);
    }
  }
};

const processIndividual = () => {
  console.log('processing individual account');
  let individualContainer = document.querySelector('.individual');

  if (
    individualContainer == null ||
    individualContainer.hasAttribute('disabled')
  )
    return resolvedPromise('Individual Disabled');

  console.log('Individual?');
  return stripe
    .createToken('account', {
      business_type: 'individual',
      individual: {email: individualContainer.dataset.email},
      tos_shown_and_accepted: true,
    })
    .then(
      function(result) {
        console.log('INDIVIDUAL ACCOUNT result', result);
        document.querySelector('#account-token').value = result.token.id;
        return resolvedPromise('Individual Token Set');
      },
      function(error) {
        console.log('INDIVIDUAL ACCOUNT ERROR result', error);
      },
    );
};

const processCompany = () => {
  let companyContainer = document.querySelector('.company');

  if (companyContainer == null || companyContainer.hasAttribute('disabled'))
    return resolvedPromise('Company Disabled');

  let company = {
    name: companyContainer.querySelector('[data-business-name]').value,
    phone: companyContainer.querySelector('[data-phone]').value,
    address: {
      line1: companyContainer.querySelector('[data-address]').value,
      city: companyContainer.querySelector('[data-city]').value,
      state: companyContainer.querySelector('[data-state]').value,
      postal_code: companyContainer.querySelector('[data-zip]').value,
    },
  };

  let tax_id = companyContainer.querySelector('[data-tax-id]').value;
  if (tax_id.length != 0) {
    company.tax_id = tax_id;
  }
  return stripe
    .createToken('account', {
      business_type: 'company',
      company: company,
      tos_shown_and_accepted: true,
    })
    .then(function(result, person) {
      document.querySelector('#account-token').value = result.token.id;
    });
};

const processPersons = () => {
  const persons = document.querySelectorAll('[data-person]');
  if (persons.length == 0) return Promise.resolve();
  let personPromises = [];

  for (i = 0; i < persons.length; ++i) {
    personPromises.push(new StripePerson(persons[i]));
  }

  return Promise.all(personPromises);
};

async function handleForm(event) {
  event.preventDefault();

  let stripePromises = [];

  stripePromises.push(processExternalAccountCard());
  stripePromises.push(processExternalAccount());
  stripePromises.push(processIndividual());
  stripePromises.push(processCompany());
  stripePromises.push(processPersons());

  console.log('stripePromises', stripePromises);
  Promise.all(stripePromises)
    .then(
      function(result) {
        console.log('SUBMITTING');
        myForm.submit();
      },
      function(error) {
        console.log('error');
      },
    )
    .catch(error => {
      console.log('Error', error);
    });
}

const onContent = el => {
  el.classList.remove('collapse');
  el.removeAttribute('disabled');
};

const offContent = el => {
  el.classList.add('collapse');
  el.setAttribute('disabled', 'disabled');
};

const onSwitch = el => el.classList.add('active');
const offSwitch = el => el.classList.remove('active');
const toggleRadio = el => {
  console.log(el);
  const clicked = el;
  const id = clicked.dataset.toggleSwitch;
  const target = clicked.dataset.toggleTarget;

  // Turn all off
  Array.prototype.slice
    .call(document.querySelectorAll(`[data-toggle-switch="${id}"]`))
    .map(offSwitch);
  Array.prototype.slice
    .call(document.querySelectorAll(`[data-toggle-target="${id}"]`))
    .map(offContent);

  // Turn off some
  onSwitch(clicked);
  Array.prototype.slice
    .call(document.querySelectorAll(`[data-toggle-content="${target}"]`))
    .map(onContent);
};

Array.prototype.slice
  .call(document.querySelectorAll('[data-toggle-switch]'))
  .map(el => {
    el.addEventListener('change', e => {
      toggleRadio(e.target);
    });
  });

Array.prototype.slice
  .call(document.querySelectorAll('a[data-toggle-switch]'))
  .map(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      toggleRadio(e.target);
    });
  });

Array.prototype.slice
  .call(document.querySelectorAll('[data-toggle-switch]:checked'))
  .map(el => {
    toggleRadio(el);
  });
