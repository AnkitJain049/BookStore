import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
      {books.map((item) => (
        <div className='bg-gray-800 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105'>
          <BookSingleCard key={item._id} book={item} />
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
