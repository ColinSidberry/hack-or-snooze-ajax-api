"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/**Pulls new story data (author, title, URL) and prepend the information to the DOM.  */
async function getNewStoryAndPrependToDOM(evt) {
  console.debug("getNewStoryAndPrependtoDOM", evt);
  evt.preventDefault();
  const author = $newStoryAuthor.val();
  const title = $newStoryTitle.val();
  const url = $newStoryURL.val();
  let newStory = await storyList.addStory(currentUser, { title, author, url });
  $allStoriesList.prepend(generateStoryMarkup(newStory));
}


$newStorySubmitForm.on("submit", getNewStoryAndPrependToDOM);


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
      <button class="favorite-button"><i class="fas fa-heart"></i></button>
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

/** Gets list of favorite stories from user, generates their HTML, and puts on page */

function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");

  $allStoriesList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();

}

/** Consider breaking apart
 * 
 * Takes in a clicked event on a story favorite button
 * Finds storyId of clicked array
 * Checks if the story has been favorited before or not
 *  Add to user's favorite story array if the story hasn't been favorited before
 *  Otherwise remove from user's favorite story array 
 * 
 */
function handleFavoriteClick(evt) {
  console.debug("handleFavoriteClick");
  const clickedStoryId = $(evt.target).closest("li").attr("id");
  // console.log("storyIdList: ", storyId);
  let favoriteStory = currentUser.favorites.find(
    ({ storyId }) => storyId === clickedStoryId
  );

  if (!favoriteStory) {
    // instead of looping through all stories, just do array.find()
    let newFavoriteStory = storyList.stories.find(
      ({ storyId }) => storyId === clickedStoryId
    );
    // console.log("newFavStory", newFavoriteStory);
    currentUser.addFavorite(newFavoriteStory);

  } else {
    currentUser.removeFavorite(favoriteStory);
  }
}

$allStoriesList.on("click", ".favorite-button", handleFavoriteClick);


