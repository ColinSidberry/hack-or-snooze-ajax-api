"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:
const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navSubmit = $("#nav-submit");
const $navFavorites = $("#nav-favorites");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

const $newStorySubmitForm = $("#new-story-submit-form");

const $newStoryAuthor = $("#new-story-author");
const $newStoryTitle = $("#new-story-title");
const $newStoryURL = $("#new-story-url");

//Question: Any tips on how to group these global variables?



/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $newStorySubmitForm // newly added 9/1/21 5pm
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
