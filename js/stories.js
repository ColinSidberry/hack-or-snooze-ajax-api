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

// Issue/Question
// for some reason, storyList isn't being updated after a new story is added
// storyList starts at 25 and should increase to 26 when a new story is submitted,
// however, the console.logs() still show the old number of 25 for storyList
// which doesn't include the most recently added story
// this makes it so adding a recent story submission as a favorite will not work



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


function handleFavoriteClick(evt) {
  const clickedStoryId = $(evt.target).closest("li").attr("id")//.("#id");//Question: why are u red?
  // console.log("storyIdList: ", storyId);
  let favoritesIndex =  currentUser.favorites.findIndex(({storyId}) => storyId === clickedStoryId);
  if(favoritesIndex < 0) {
    for (let story of storyList.stories) {
      console.log('inside loop');
      if (story["storyId"] === clickedStoryId) {
        // console.log("currentUser", currentUser)
        currentUser.addFavorite(story);
      }
    }
  } else {
    currentUser.removeFavorite(favoritesIndex);
  }
  //if in favorite
    //call remove function
}


// current function takes in a sotry
//same as current function (function->story)

$allStoriesList.on("click", ".favorite-button", handleFavoriteClick);
//where does this go

