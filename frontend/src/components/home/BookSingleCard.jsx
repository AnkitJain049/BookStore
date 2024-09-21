import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border border-gray-700 rounded-lg p-4 m-4 bg-gray-800 hover:shadow-xl transition-shadow duration-300'>
      <h2 className='px-4 py-1 bg-sky-300 text-gray-900 rounded-lg'>
        {book.publishYear}
      </h2>
      <div className='flex justify-start items-center gap-x-2 my-2'>
        <PiBookOpenTextLight className='text-sky-300 text-2xl' />
        <h2 className='text-white'>{book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-sky-300 text-2xl' />
        <h2 className='text-white'>{book.author}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4'>
        <BiShow
          className='text-3xl text-sky-400 hover:text-white cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='text-2xl text-green-300 hover:text-white' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-300 hover:text-white' />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-red-500 hover:text-white' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
