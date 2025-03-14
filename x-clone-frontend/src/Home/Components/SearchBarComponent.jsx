import ReactModal from 'react-modal';
import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import { useEffect } from 'react';
import { getUserByUserName } from '../../Users/Controller';
import { useContext } from 'react';
import { LogInContext } from '../../LogIn/Context';
import { Link } from 'react-router-dom';

export const SearchBarComponent = () => {
  const { User } = useContext(LogInContext);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [searchedUser, setSearchedUser] = useState('');

  const openModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeModal = () => {
    setCurrentUser(undefined);
    setIsOpen((prevState) => !prevState);
  };

  const notification = (message, route) => {
    return (
      <div className="flex flex-col justify-center items-center mt-4">
        <p className="font-bold hover:underline">{message}</p>
        <img src={`/${route}`} className="size-48" />
      </div>
    );
  };

  useEffect(() => {
    if (searchedUser) {
      const getData = setTimeout(() => {
        getUserByUserName(User, searchedUser).then((response) => {
          setCurrentUser(response?.data?.data);
        });
      }, 1000);

      return () => clearTimeout(getData);
    }
  }, [searchedUser]);

  return (
    <>
      <div className="w-full ml-4 pt-2">
        <div
          className="flex flex-row justify-start items-center bg-[rgb(47,50,53)] w-11/12 rounded-full"
          onClick={openModal}
        >
          <IoSearch className="text-white text-xl cursor-pointer ml-4" />
          <input
            className="border border-[rgb(47,50,53)] bg-[rgb(47,50,53)] w-10/12 focus:outline-none text-white pl-4 h-12 font-semibold"
            placeholder="Search"
          />
        </div>
      </div>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '20%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'black',
            width: '634px',
            minHeight: '200px',
          },
        }}
      >
        <div className="flex">
          <div className="flex-1" onClick={closeModal}>
            <IoMdClose
              data-tooltip-id="tooltip-close"
              data-tooltip-content="Close"
              data-tooltip-place="bottom"
              className="w-5 h-5 rounded-full cursor-pointer outline-none text-white mb-3"
            />
            <Tooltip id="tooltip-close" />
          </div>
        </div>
        <div className="flex flex-row justify-start items-center bg-[rgb(47,50,53)] w-full rounded-full">
          <IoSearch className="text-white text-xl cursor-pointer ml-4" />
          <input
            className="border border-[rgb(47,50,53)] bg-[rgb(47,50,53)] w-10/12 focus:outline-none text-white pl-4 h-12 font-semibold"
            placeholder="Search"
            onChange={(e) => setSearchedUser(e.target.value)}
          />
        </div>
        <div>
          {!currentUser?.Name ? (
            <div className="w-full">
              {notification('Loading...', 'Loading.svg')}
            </div>
          ) : (
            <>
              <Link to={`profile/${currentUser.userName}`} onClick={closeModal}>
                <div className="min-w-lg bg-black text-white">
                  <div className="flex items-start p-4 hover:bg-gray-900 border-b border-gray-800">
                    <img
                      src={currentUser.photo}
                      alt={`${currentUser.userName} avatar`}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="font-bold hover:underline">
                            {currentUser.Name}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-500">
                        @{currentUser.userName}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>
      </ReactModal>
    </>
  );
};
