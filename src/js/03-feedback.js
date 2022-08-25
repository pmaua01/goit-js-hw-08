import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name=email]'),
  text: document.querySelector('[name=message]'),
};

const TEXT_INPUT = 'feedback-form-state';
// const formInput = {};

refs.form.addEventListener('input', throttle(onInput, 500));

refs.form.addEventListener('submit', onSubmit);
showSavedInput();

function onInput(e) {
  // console.log(e.target.name);
  let formInput = localStorage.getItem(TEXT_INPUT);
  formInput = formInput ? JSON.parse(formInput) : {};

  formInput[e.target.name] = e.target.value;
  console.log('onInput', formInput);

  localStorage.setItem(TEXT_INPUT, JSON.stringify(formInput));
}

function onSubmit(e) {
  const save = localStorage.getItem(TEXT_INPUT);
  e.preventDefault();
  console.log(JSON.parse(save));
  localStorage.removeItem(TEXT_INPUT);
  e.target.reset();
}

function showSavedInput() {
  let formInput = localStorage.getItem(TEXT_INPUT);
  console.log('Function show', formInput);

  if (formInput) {
    formInput = JSON.parse(formInput);
    console.log('for each 0', formInput);
    Object.entries(formInput).forEach(([name, value]) => {
      console.log('For each', name, value);
      formInput[name] = value;
      console.log(formInput);
    });

    formInput.message ? (refs.text.value = formInput.message) : '';
    formInput.email ? (refs.email.value = formInput.email) : '';

    // refs.text.value = formInput.message;
    // refs.email.value = formInput.email;
  }
}
