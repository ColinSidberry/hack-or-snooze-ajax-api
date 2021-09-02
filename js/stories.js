"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
const $newStorySubmitForm = $("#new-story-submit-form"); // move to main.js

/**Pulls new story data (author, title, URL) and prepend the information to the DOM.  */
async function getNewStoryAndPrependToDOM(evt) {
  evt.preventDefault();
  const author = $("#new-story-author").val(); // move to main.js
  const title = $("#new-story-title").val();
  const url = $newStoryURL.val();

  let newStory = await storyList.addStory(currentUser, { title, author, url });

  $allStoriesList.prepend(generateStoryMarkup(newStory));
  console.log("Your story was added.") // replace this with a console.debug at top like other fns; console.log should mention where
}
$newStorySubmitForm.on("submit", getNewStoryAndPrependToDOM);//Question: When do we need to do event delegation here? to have the pa


/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
