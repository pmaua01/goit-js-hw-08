import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name=email]'),
  text: document.querySelector('[name=message]'),
};

const TEXT_INPUT = 'feedback-form-state';
const formInput = {};

refs.form.addEventListener('input', throttle(onInput, 500));

refs.form.addEventListener('submit', onSubmit);
showSavedInput();

function onInput(e) {
  //   console.log(e.target.name);
  formInput[e.target.name] = e.target.value;
  //   console.log(formInput);
  const saveText = JSON.stringify(formInput);
  //   console.log(saveText);
  localStorage.setItem(TEXT_INPUT, saveText);
}

function onSubmit(e) {
  const save = localStorage.getItem(TEXT_INPUT);
  e.preventDefault();
  console.log(JSON.parse(save));
  localStorage.removeItem(TEXT_INPUT);
  e.target.reset();
}

function showSavedInput() {
  const save = localStorage.getItem(TEXT_INPUT);

  if (save) {
    const textInsert = JSON.parse(save);
    console.log(textInsert);
    textInsert.message
      ? (refs.text.value = textInsert.message)
      : (refs.text.value = '');

    textInsert.email
      ? (refs.email.value = textInsert.email)
      : (refs.email.value = '');

    // console.log(formInput);
  }
}
