import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col justify-center items-center">
      <BackButton />
      <h1 className="text-5xl font-bold my-8 text-sky-600">Delete Book</h1>

      {loading ? <Spinner /> : ''}

      <div className="flex flex-col items-center border border-gray-700 shadow-2xl rounded-2xl w-full max-w-lg p-8 mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <h3 className="text-3xl font-semibold text-center text-sky-400 mb-6">
          Are you sure you want to delete this book?
        </h3>

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-gray-200 font-semibold py-4 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 mb-4"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>

        <button
          className="w-full bg-white hover:bg-gray-700 text-black font-semibold py-4 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={() => navigate('/')}
        >
          No, Go Back
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
