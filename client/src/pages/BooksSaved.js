/* Importing the necessary components from the API, Auth, and localStorage files. */
import { getMe, deleteBook } from "../utils/API";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

/* This is the useEffect hook. It is a function that is called after every render. It is used to
perform side effects in function components. */
const BooksSaved = () => {
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  /**
   * It takes a bookId as an argument, gets the token from the Auth module, and then calls the deleteBook
   * function from the API module. If the response is successful, it updates the userData state and
   * removes the bookId from the bookIds state
   * @param bookId - the id of the book to be deleted
   * @returns return (
   *     <div className="App">
   *       <Navbar user={user} />
   *       <Switch>
   *         <Route exact path="/">
   *           <Home />
   *         </Route>
   *         <Route path="/login">
   *           <Login />
   *         </Route>
   *         <Route path="/signup">
   *           <Signup />
   */
  const BooksDelete = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userDataLength) {
    return <h3>Please Wait!</h3>;
  }

  return (
    <>
      {/* A component that is used to display a short and simple page for calling extra attention to some
    special content or information. */}
      <Jumbotron fluid className="text-brown">
        <Container>
          <h2>Checking out books saved!</h2>
        </Container>
      </Jumbotron>
      <Container>
        {/* This is a ternary operator. It is a conditional operator that is used to assign a value to a
       variable based on some condition. */}
        <h2>
          {userData.BooksSaved.length
            ? `Viewing ${userData.BooksSaved.length} saved ${
                userData.BooksSaved.length === 1 ? "book" : "books"
              }:`
            : "No saved books at this time!"}
        </h2>

        {/* A component that is used to display a short and simple page for calling extra attention to
       some
       special content or information. */}
        <CardColumns>
          {userData.BooksSaved.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => BooksDelete(book.bookId)}
                  >
                    Delete Now!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

/* Exporting the BooksSaved component. */
export default BooksSaved;
