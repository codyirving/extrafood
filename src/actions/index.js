export const TOGGLE_MAIN_PAGE = "TOGGLE_MAIN_PAGE";
export const toggleMainPage = () => ({
  type: TOGGLE_MAIN_PAGE
});
export const MAKE_GUESS = "MAKE_GUESS";
export const makeGuess = guess => ({
  type: MAKE_GUESS,
  guess
});
