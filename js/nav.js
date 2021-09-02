"use strict";
console.log("nav.js ran");
/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navShowSubmitForm (evt) {
  console.log("navShowSubmit ran");
  console.debug("navShowSubmitForm", evt);//Question: why do we do this?
  //get the id for the form
  //then pass in show class
  const $newStorySubmitForm = $("#new-story-submit-form");
  $newStorySubmitForm.show();
}

$navSubmit.on("click", navShowSubmitForm);
$navSubmit.on("click", console.log("Hey the click worked!"));
console.log("$navSubmit",$navSubmit);
// console.log("$navLogin",$navLogin);

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

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
