"use strict";
/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/**Shows the form for submiting a new story upon clicking the submit link in the nav. */
function navShowSubmitForm (evt) {
  console.debug("navShowSubmitForm", evt);//Question: why do we do this?
  //get the id for the form
  //then pass in show class
  const $newStorySubmitForm = $("#new-story-submit-form");
  $newStorySubmitForm.show();
}

$navSubmit.on("click", navShowSubmitForm);


/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
