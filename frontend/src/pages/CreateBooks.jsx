import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <BackButton />
      <h1 className="text-5xl font-bold text-center my-8 text-sky-400">Create New Book</h1>
      
      {loading ? <Spinner /> : ''}

      <div className="flex flex-col border border-gray-700 shadow-xl rounded-2xl w-full max-w-lg p-8 mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="my-4">
          <label className="block text-lg font-medium text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 rounded-lg border-gray-600 bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full p-3 text-white"
            placeholder="Enter book title"
          />
        </div>

        <div className="my-4">
          <label className="block text-lg font-medium text-gray-300 mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 rounded-lg border-gray-600 bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full p-3 text-white"
            placeholder="Enter author name"
          />
        </div>

        <div className="my-4">
          <label className="block text-lg font-medium text-gray-300 mb-2">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 rounded-lg border-gray-600 bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full p-3 text-white"
            placeholder="Enter publish year"
          />
        </div>

        <button
          onClick={handleSaveBook}
          className="mt-6 w-full bg-sky-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
