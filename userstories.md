## TypeRacer user stories

### Responsive and accessible design (must-have)

**User story**

As a general user, I want the website to be responsive on various devices so that I can take the typing test on my preferred device.

**Acceptance Criteria:**

- [ ] The website layout adapts to different screen sizes (desktop, tablet, smartphone).

**Tasks:**

- [ ] Implement responsive design for the website to adapt to different screen sizes (desktop, tablet, smartphone)

### Start and stop actions (must-have)

**User story**

As a casual user, I want to start and stop the typing speed test so that I can accurately measure my typing speed.

**Acceptance Criteria:**

- [ ] The test begins by user action, such as clicking a start button
- [ ] The test ends by user action, such as clicking a stop button
- [ ] It is clear to the user how they can start and stop the test

**Tasks:**

- [ ] Create a user action that triggers the start of the test
- [ ] Create a user action that triggers the end of the test
- [ ] Create clear actions the user needs to take to start and stop the test

### Display typing test sample text (must-have)

**User story**

As a user, I want to see a sample of text to type so that I know what I need to type to measure my speed.

**Acceptance Criteria:**

- [ ] A sentence of sample text is clearly visible and formatted for easy reading.
- [ ] The sample text is randomly chosen from a set selection for each level of difficulty. (easy, medium or hard)

**Tasks:**

- [ ] Implement functionality to display a random paragraph of text upon starting the test, depending on the level of difficulty selected by the user.
- [ ] Ensure the text is clearly visible and formatted for easy reading.

### User typing input section (must-have)

**User story**

As a user, I want a dedicated area to type the displayed text so that I can input my typing accurately.

**Acceptance Criteria:**

- [ ] An editable text area is provided separate from the displayed text.
- [ ] The text area is initially empty and ready for user input.
- [ ] The text area contains a placeholder that indicates how to start the test.

**Tasks:**

- [ ] Add an editable text area for user input.
- [ ] Ensure the text area starts empty and is ready for typing.
- [ ] Ensure the text area placeholder text indicates to the user how to start the test.

### Calculate and display Words Per Minute (WPM) (must-have)

**User story**

As a user, I want to see my typing speed calculated in Words Per Minute (WPM) when I finish typing so that I know my typing performance.

**Acceptance Criteria:**

- [ ] WPM is calculated based on the number of correctly typed words and elapsed time.
- [ ] The difficulty level and WPM result is displayed immediately after completing the test.

**Tasks:**

- [ ] Create a results area to display the level, time and Words Per Minute (WPM) results to the user
- [ ] Implement functionality to calculate the number of correctly typed WPM.
- [ ] Display the WPM result with the level and time immediately after the user completes the test.

### Retry button (WPM) (should-have)

**User story**

As a user, I want to be able to easily retry my typing speed test so that I can work on improving my typing speed.

**Acceptance Criteria:**

- [ ] A retry button is clearly visible on the web page
- [ ] When the retry button is clicked, a new test is set up at the same difficulty level as the previous one.

**Tasks:**

- [ ] Add a "Retry" button to the typing test.
- [ ] Ensure clicking the "Retry" button resets the test for a new attempt at the same difficulty level as the previous test.

### Real-time feedback on typing accuracy (should-have)

**User story**

As a user, I want to see real-time feedback on my typing accuracy so that I can immediately know if I am making errors.

**Acceptance Criteria:**

- [ ] As the user types, correctly typed words are highlighted in blue.
- [ ] As the user types, incorrectly typed words are highlighted in red.

**Tasks:**

- [ ] Implement the functionality to highlight correctly typed words in blue and incorrectly typed words in red.
- [ ] Ensure the highlighting happens in real time as the user is typing.

### Test instructions modal (should-have)

**User story**

As a new user, I want clear instructions on how to use the typing speed test so that I know how to start and complete the test.

**Acceptance Criteria:**

- [ ] Clear instructions on how to take the test are provided on the homepage.
- [ ] Instructions are easy to understand and follow.

**Tasks:**

- [ ] Create a modal that displays clear instructions to the user on how to take the test.
- [ ] Add a clearly visible button on the web page to open the instructions modal.

### Display best test results for each difficulty level (could-have)

**User story**

As a competitive user, I want my best results for each difficulty level to be displayed so that I can compare my progress.

**Acceptance Criteria:**

- [ ] The best test result for each level is stored
- [ ] The best test result for each level is displayed on the site

**Tasks:**

- [ ] Create an area to display the best test results for each level of difficulty
- [ ] The best test result for each level is stored and displayed to the user
