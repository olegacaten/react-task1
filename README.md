## Scoring Checklist

1. **ESLint Setup (15 points)**
   - [ ] ESLint is set up.
   - [ ] Running the lint command produces no errors (warnings may reduce the score).

2. **Prettier Setup (15 points)**
   - [ ] Prettier is set up.
   - [ ] The `format:fix` command fixes issues.

3. **Husky Setup (10 points)**
   - [ ] Husky is set up.
   - [ ] Linting is run on pre-commit.

4. **Page Layout (20 points)**
   - [ ] Page is split into two sections:
     - [ ] Top section contains a Search input and a "Search" button.
     - [ ] Main section displays a list of results from the selected API when the page is first opened.
     - [ ] Loader is shown while making a call to the API.

5. **Search Functionality (15 points)**
   - [ ] Typing into the Search input and clicking the "Search" button displays a loader.
   - [ ] The list is updated according to the response results for the provided search term.

6. **LocalStorage Integration (15 points)**
   - [ ] The search term is saved in LocalStorage when the "Search" button is clicked.
   - [ ] Closing the tab and reopening the app retains the previously entered search term in the initial call.

7. **ErrorBoundary Implementation (10 points)**
   - [ ] Application is wrapped with an ErrorBoundary.
   - [ ] ErrorBoundary logs errors to the console and shows a fallback UI.
   - [ ] There is a button to throw an error for testing.

### Total Points: 100
