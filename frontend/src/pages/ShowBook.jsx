import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <BackButton />
      <h1 className="text-4xl font-bold text-sky-400 my-8">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border border-gray-700 shadow-2xl rounded-2xl w-full max-w-2xl p-8 mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black">
          <div className="my-4">
            <span className="text-2xl font-semibold mr-4 text-sky-400">Id:</span>
            <span className="text-lg">{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold mr-4 text-sky-400">Title:</span>
            <span className="text-lg">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold mr-4 text-sky-400">Author:</span>
            <span className="text-lg">{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold mr-4 text-sky-400">Publish Year:</span>
            <span className="text-lg">{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold mr-4 text-sky-400">Create Time:</span>
            <span className="text-lg">{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold mr-4 text-sky-400">Last Update Time:</span>
            <span className="text-lg">{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
