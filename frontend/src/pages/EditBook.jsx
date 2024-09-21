import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error loading book data', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col justify-center items-center">
      <BackButton />
      <h1 className="text-5xl font-bold my-8 text-sky-400">Edit Book</h1>

      {loading ? <Spinner /> : ''}

      <div className="flex flex-col border border-gray-700 shadow-2xl rounded-2xl w-full max-w-lg p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="my-4">
          <label className="text-2xl mr-4 text-gray-400">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white px-4 py-3 w-full rounded-md shadow-md focus:outline-none focus:ring focus:ring-sky-500 transition-all"
          />
        </div>
        <div className="my-4">
          <label className="text-2xl mr-4 text-gray-400">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white px-4 py-3 w-full rounded-md shadow-md focus:outline-none focus:ring focus:ring-sky-500 transition-all"
          />
        </div>
        <div className="my-4">
          <label className="text-2xl mr-4 text-gray-400">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white px-4 py-3 w-full rounded-md shadow-md focus:outline-none focus:ring focus:ring-sky-500 transition-all"
          />
        </div>
        <button
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditBook;
