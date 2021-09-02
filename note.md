1. Initial Web Review
    1. Create Accounts
        -  name, username, password, button to create account (form submission)
        -  website somehow stores account creation time to display later
        -   if username already exists, return an error and don't post new account
            - maybe compare username with existing backend accounts and return  an error
        - account is stored as an object structure
        - when leaving account creation inputs blank    
            - no alerts, form values aren't reset, only console errors
    2. Logging In
        - Login
            - Username, Password, button (form submission)
        - While logged in
            - navbar has new buttons
                -submit, favorite, mystories, logout
                    - submit appends a new story 
                        - articles are probably an objects
                    - my stories
                        - maybe another array?
                        - there is a delete button next to your submitted articles
                            - note when there's no stories, it has a message
                            - also doesn't not return to home page
            -   clicking on Username displays username, name, and account creation date
    3. Create Articles
        - Title, link to article(external website), author of article, posted by username

    4. Mark Articles as Favorites
        - favoriting
            - has a UI change by filling in star
            - probably adds a new class so when you click on    favorites button it filters
                - maybe using array.filter based on class?
            - when there's no favorites, it has a message saying none
                - probably an if condition 
    5. Other
        - token authentication?
            - play around with logging to see how tokens are being utilized/generated?

    6. Insomnia
        - stories get request
            - returned homepage stories
                - data structure is an array of objects
2. Code Review
    1. search for unimplemented
    2. login doesn't give the additional navbar elements (favorite, submit, my stories)
    3. Clicking on the account name doesn't do anything
    4. For Stories - where is the favorite button populated
    5. Static - why would you call the class instead of an instance
        1. Why would you not want getStories to only apply for the story class but not the instance
    6. How do you populate the nav bar with favorites, submit, and my_stories
    7. Why is the token in network?

Questions
1. For form labels and class/id names, what is the naming convention? Camelcase? or dashes?