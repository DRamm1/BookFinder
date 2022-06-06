/**
 * It returns an array of book ids that are saved in local storage
 * @returns An array of book ids.
 */
export const findBookId = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

/**
 * It saves the array of book IDs to local storage if the array is not empty, and removes the saved
 * array from local storage if the array is empty
 * @param bookIdArr - an array of book IDs
 */
export const saveID = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

/**
 * If there are no saved books, return false.
 * @param bookId - the id of the book to be deleted
 * @returns the savedBookIds array with the bookId removed.
 */
export const deleteID = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

/* Filtering the savedBookIds array and removing the bookId that is passed in. */
  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};
