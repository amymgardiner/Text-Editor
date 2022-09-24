const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // stash the event so it can be triggered later
  window.deferredPrompt = event;
  // remove the 'hidden' class from the install button container
  butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // show the install prompt
  promptEvent.prompt();
  window.deferredPrompt = null;
  // hide the install button
  butInstall.classList.toggle('hidden', true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
