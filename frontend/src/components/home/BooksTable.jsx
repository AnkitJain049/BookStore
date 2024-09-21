import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <table className='w-full border-separate border-spacing-2 text-white'>
      <thead>
        <tr>
          <th className='border border-sky-600 rounded-md bg-gray-900'>No</th>
          <th className='border border-sky-600 rounded-md bg-gray-900'>Title</th>
          <th className='border border-sky-600 rounded-md bg-gray-900 max-md:hidden'>
            Author
          </th>
          <th className='border border-sky-600 rounded-md bg-gray-900 max-md:hidden'>
            Publish Year
          </th>
          <th className='border border-sky-600 rounded-md bg-gray-900'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-8 bg-gray-800 hover:bg-gray-700'>
            <td className='border border-sky-700 text-center'>{index + 1}</td>
            <td className='border border-sky-700 text-center'>{book.title}</td>
            <td className='border border-sky-700 text-center max-md:hidden'>{book.author}</td>
            <td className='border border-sky-700 text-center max-md:hidden'>{book.publishYear}</td>
            <td className='border border-sky-700 text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className='text-2xl text-green-300 hover:text-white' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-300 hover:text-white' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-400 hover:text-white' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
