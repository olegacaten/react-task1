## Scoring Checklist

1. **ESLint Setup (15 points)**
   - [x] ESLint is set up.
   - [x] Running the lint command produces no errors (warnings may reduce the score).

2. **Prettier Setup (15 points)**
   - [x] Prettier is set up.
   - [x] The `format:fix` command fixes issues.

3. **Husky Setup (10 points)**
   - [x] Husky is set up.
   - [x] Linting is run on pre-commit.

4. **Page Layout (20 points)**
   - [x] Page is split into two sections:
     - [x] Top section contains a Search input and a "Search" button.
     - [x] Main section displays a list of results from the selected API when the page is first opened.
     - [x] Loader is shown while making a call to the API.

5. **Search Functionality (15 points)**
   - [x] Typing into the Search input and clicking the "Search" button displays a loader.
   - [] The list is updated according to the response results for the provided search term.

6. **LocalStorage Integration (15 points)**
   - [ ] The search term is saved in LocalStorage when the "Search" button is clicked.
   - [ ] Closing the tab and reopening the app retains the previously entered search term in the initial call.

7. **ErrorBoundary Implementation (10 points)**
   - [ ] Application is wrapped with an ErrorBoundary.
   - [ ] ErrorBoundary logs errors to the console and shows a fallback UI.
   - [ ] There is a button to throw an error for testing.

### Total Points: 100
