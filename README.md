# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

[![Frontend Mentor Badge](https://img.shields.io/badge/Frontend%20Mentor-3F54A3?logo=frontendmentor&logoColor=fff&style=flat)](https://www.frontendmentor.io/solutions/responsive-password-generator-app-6-9loaA8ot) [![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=fff&style=flat)](https://password-generator-vm.netlify.app/)

## My process

### Built with

- [x] Semantic HTML5 markup
- [x] Flexbox
- [x] [Syntactically Awesome Style Sheets](https://sass-lang.com/)
- [x] Mobile-first workflow
- [x] JavaScript
- [x] [Vite](https://vite.dev/)
- [x] [pnpm](https://pnpm.io/)

### What I learned

This project was a fantastic opportunity to dive deeper into JavaScript DOM manipulation and strengthen my understanding of user interactions. Here are the key things I'm taking away:

**Password generation logic**: I learned to dynamically build character sets based on user preferences and generate passwords using cryptographically secure random number generation with `crypto.getRandomValues()`.

**Password strength algorithm**: I got to implement a real password strength checker that evaluates both length and character variety, creating a meaningful rating system with visual feedback.

**Dynamic UI state management**: I learned to manage complex UI states with the strength indicator bars, creating a system that dynamically adds/removes CSS classes based on password strength while keeping the code clean and maintainable.

**Modern clipboard API integration**: This was my first time working with the async Clipboard API. I learned to handle the promise-based API and provide user feedback when the copy operation succeeds or fails.

```js
async function handleCopyPassword() {
  try {
    await navigator.clipboard.writeText(passwordInput.value);
    copiedFeedback.classList.remove('hidden');
    setTimeout(() => copiedFeedback.classList.add('hidden'), 4000);
  } catch (error) {
    copiedFeedback.textContent = 'Failed to copy';
    copiedFeedback.classList.remove('hidden');
    setTimeout(() => copiedFeedback.classList.add('hidden'), 4000);
  }
}
```

## Author

- Frontend Mentor - [@ValeriaMontoya](https://www.frontendmentor.io/profile/ValeriaMontoya)
- Twitter - [@val_smf](https://twitter.com/val_smf)
