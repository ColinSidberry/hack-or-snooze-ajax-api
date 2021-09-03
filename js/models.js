"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */

class Story {

  /** Make instance of Story from data object about story:
   *   - {title, author, url, username, storyId, createdAt}
   */

  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  /** Parses hostname out of URL and returns it. */

  getHostName() {
    // UNIMPLEMENTED: complete this function!
    // get URL passed in
    // stringify
    // call .split("/")
    // index 2 in the array is hostname
    // return above

    let hostname;
    let rawURL = this.url.split("/")[2];
    let splitRawURL = rawURL.split(".");

    // if (splitRawURL[0] === "www") {
    //   hostname = `${splitRawURL[1]}.${splitRawURL[2]}`;
    // } else {
    //   hostname = rawURL;
    // }

    hostname = splitRawURL[0] === "www" ? `${splitRawURL[1]}.${splitRawURL[2]}` : rawURL;

    // hostname = new URL(this.url).hostname; // still includes www subdomain
    // console.log('hostname check', hostname)

    return hostname
  }
}


/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** Generate a new StoryList. It:
   *
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.
   */

  static async getStories() {
    // Note presence of `static` keyword: this indicates that getStories is
    //  **not** an instance method. Rather, it is a method that is called on the
    //  class directly. Why doesn't it make sense for getStories to be an
    //  instance method?

    // query the /stories endpoint (no auth required)
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    // turn plain old story objects from API into instances of Story class
    const stories = response.data.stories.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    return new StoryList(stories);
  }

  /** Adds story data to API, makes a Story instance, adds it to story list.
   * - user - the current instance of User who will post the story
   * - obj of {title, author, url}
   *
   * Returns the new Story instance
   */

  async addStory(user, newStory) {
    // UNIMPLEMENTED: complete this function!

    // using the user and newStory obj,  return newStory
    // connect to API when returning the newStory

    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "POST",
      data: {
        token: user.loginToken,
        story: newStory
      }
    });

    const { story } = response.data;

    // console.log('user', user)
    // console.log('newStory', newStory)
    // console.log('response', response)
    // console.log('response.data', response.data)
    // console.log('story', story)
    // console.log('responseStruc', story.author)

    let newStoryInstance = new Story(
      {
        author: story.author,
        createdAt: story.createdAt,
        storyId: story.storyId,
        title: story.title,
        updatedAt: story.createdAt,
        url: story.url,
        username: story.username
      }
    );

    this.stories.unshift(newStoryInstance);
    return newStoryInstance;

  }
}


/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
  /** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

  constructor({
    username,
    name,
    createdAt,
    favorites = [],
    ownStories = []
  },
    token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));

    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });

    const { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    const { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  /** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      const { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

  /**Doc string
   * 
   * Adding favorite story to user's favorites array and update database about new addition
   * 
   */
  async addFavorite(story) {
    console.debug("addFavorite");

    // Instruction: Add two methods to the User class, letting the user favorite or un-favorite a story. These methods will need to take a Story instance. They should also send a request to the API so the server knows when a favorite/un-favorite action occurs.

    // 1. need to figure out how to add to favorites array(?) within User class


    this.favorites.push(story);

    // 2.  taking into account the favorite icon in DOM to add //Question: to capture the user click do we need a button or can we use an a tag or something else?
    // Done
    // 3. get identifier from DOM that marks a favorite story
    //listener on the parent -> id="all-stories-list"
    //drill button class .favorites
    // done
    // 4. on click, add the story to favorite
    /// done
    // 5.  an API POST request;
    // need to figure out structure
    // how to pass in token of user in the API post request body? done
    // review axios or API docs for how to pass in a token in the body done
    // maybe similar to passing in "data {}" in previous axios uses

    await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${story.storyId}`,
      method: "POST",
      data: { token: this.loginToken }
    }); // Question, is there a way to see what the POST is sending in Chrome console? 

  }

  /**
   * Takes in a story that has already been favorited,
   *  removes it from current user's favorite array and updates the database
   */

  async removeFavorite(toBeRemovedStory) {
    let favoritesIndex = this.favorites.findIndex(
      ({ storyId }) => storyId === toBeRemovedStory.storyId
    );
    this.favorites.splice(favoritesIndex, 1);
    // console.log("inside remove function");
    await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${toBeRemovedStory.storyId}`,
      method: "DELETE",
      data: { token: this.loginToken }
    }); // Question, is there a way to see what the POST is sending in Chrome console? 
  }
}



  // figure out how to remove favorite from array
  /**
   * user clicks
   * if the id of that clicked favorite button is in the array remove from array and database
   */

  // similar idea with eventlistner to add to favorite to find story id
  // then do array methods like splice() to remove selected/found story
  // update server with change

  // also need to update favorite icon to show favorite/unfavorite similar to solutions
  // maybe do a toggle regarding some class to indicate favorite
  // if class have favorite, when clicking on button remove from favorite


// have a favorite link in the navbar
    // favorite section that only shows the favorited stories in favorite array
        // probably populate the storiesList/container area with the favoriate array stories
    // hide the main-nav-links when not logged in
    // switch favorite icon based on favorite or not


