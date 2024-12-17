import { useState, useEffect } from 'react';
import { FormEvent } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { Book } from '../models/Book';
import { GoogleAPIBook } from '../models/GoogleAPIBook';

import Auth from '../utils/auth';

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [saveBook] = useMutation(SAVE_BOOK);

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      console.log('Search input is empty');
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong with the API request!');
      }

      const { items } = await response.json();

      if (!items) {
        console.log('No items found in the API response');
        return;
      }

      const bookData = items.map((book: GoogleAPIBook) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error('Error fetching data from API:', err);
    }
  };

  const handleSaveBook = async (bookId: string) => {
    const bookToSave: Book = searchedBooks.find((book: Book) => book.bookId === bookId)!;

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveBook({
        variables: { bookData: { ...bookToSave } },
      });

      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/images/bookshelf.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="text-light bg-dark p-5 d-flex flex-column align-items-center"
    >
      <Container className="text-center mt-5">
        <h1>Search for Books!</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={8}>
              <Form.Control
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Search for a book"
              />
            </Col>
            <Col xs={12} md={4} className="mt-3 mt-md-0">
              <Button type="submit" variant="success" size="lg" className="w-100">
                Submit Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container className="py-5">
        <h2 className="pb-3">
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : ''}
        </h2>
        <Row>
          {searchedBooks.map((book: Book) => (
            <Col md="4" key={book.bookId} className="mb-4">
              <Card border="dark" className="h-100">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text className="flex-grow-1">{book.description}</Card.Text>
                  <p className="small">Authors: {book.authors.join(', ')}</p>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some(
                        (savedId: string) => savedId === book.bookId
                      )}
                      className="mt-auto"
                      onClick={() => handleSaveBook(book.bookId)}
                      variant={
                        savedBookIds?.some((savedId: string) => savedId === book.bookId)
                          ? 'secondary'
                          : 'primary'
                      }
                    >
                      {savedBookIds?.some((savedId: string) => savedId === book.bookId)
                        ? 'Book Already Saved!'
                        : 'Save This Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SearchBooks;