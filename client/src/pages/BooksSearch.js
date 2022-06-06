/* This is importing the necessary components for the page to function. */
import Auth from "../utils/auth";
import { saveBook, searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Form,
  Button,
  Columns, 
  Card,
  CardCol,
} from "react-bootstrap";

/**
 * It's a function that returns a component that displays a list of books that match the search input
 */
const BooksSearched = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  /**
   * The SubmitForm function is an asynchronous function that prevents the default action of the event,
   * and if the searchInput is not empty, it will return false.
   * @param event - This is the event that is triggered when the form is submitted.
   * @returns The searchInput is being returned.
   */
  const SubmitForm = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    /* This is a try/catch block that is used to catch errors. */
    try {
      const response = await searchGoogleBooks(searchInput);
      if (!response.ok) {
        throw new Error("Something did not go as expected!");
      }

      /* This is destructuring the items from the response.json() and mapping over the items to return the
      bookId, authors, title, description, and image. */
      const { items } = await response.json();
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["Author Unknown"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      /* This is setting the searchedBooks to the bookData and setting the searchInput to an empty string. */
      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * If the user is logged in, save the book to the database.
   * @param bookId - the id of the book to save
   */
  const BookSave = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    /* This is checking to see if the user is logged in. If the user is logged in, the book will be saved
    to the database. */
    if (!token) {
      return false;
    }
    try {
      const response = await saveBook(bookToSave, token);
      if (!response.ok) {
        throw new Error("Something did not go as expected!");
      }

      /* This is adding the bookId to the savedBookIds array. */
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/*This is the search bar that the user will use to search for books. */}
      <Jumbotron fluid className="text-brown">
        <Container>
          <h1>Find Books!</h1>
          <Form onSubmit={SubmitForm}>
            <Form.Row>
              <Columns xs={8} md={4}>
                <Form.Control
                  name="InputSearch"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Find a book..."
                />
              </Columns>
              <Columns xs={8} md={4}>
                <Button type="submit" variant="success" size="md">
                  Search
                </Button>
              </Columns>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      {/* This is the container that is holding the searched books. */}
      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Look for a book to begin"}
        </h2>
        <CardCol>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="light">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`Cover ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some(
                        (savedBookId) => savedBookId === book.bookId
                      )}
                      className="btn-block btn-info"
                      onClick={() => BookSave(book.bookId)}
                    >
                      {savedBookIds?.some(
                        (savedBookId) => savedBookId === book.bookId
                      )
                        ? "This book is saved!"
                        : "Save book now!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardCol>
      </Container>
    </>
  );
};

/* This is exporting the BooksSearched component. */
export default BooksSearched;
