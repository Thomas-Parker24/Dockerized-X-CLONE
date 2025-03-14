import {
  GoHomeFill,
  GoSearch,
  GoBell,
  GoMail,
  GoBookmark,
  GoPerson,
} from 'react-icons/go';
import { BsSlashSquare, BsFeather } from 'react-icons/bs';
import {} from 'react-icons/bs';
import { ModalTweet } from './../../Posts/Components';
import { FaXTwitter } from 'react-icons/fa6';
import { SidebarIcon } from './../../Common/Components';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { PostsContext } from '../../Posts/Context/PostsContext';
import { LogInContext } from '../../LogIn/Context';

export const Toolbar = () => {
  const { UserName, Photo } = useContext(LogInContext);
  const { OpenModal } = useContext(PostsContext);

  const openModal = () => {
    OpenModal();
  };

  return (
    <>
      <ModalTweet />
      <div className="flex flex-col pr-8 justify-start items-end w-full min-h-full p-2 bg-black">
        <div className="p-2 hover:bg-gray-800 rounded-full cursor-pointer mb-4">
          <Link to="feed">
            <FaXTwitter className="h-8 w-8 text-white" />
          </Link>
        </div>

        <div className="space-y-2">
          <Link to="feed">
            <SidebarIcon Icon={GoHomeFill} />
          </Link>
          <Link to="underConstruction">
            <SidebarIcon Icon={GoSearch} />
          </Link>
          <Link to="underConstruction">
            <SidebarIcon Icon={GoBell} />
          </Link>
          <Link to="underConstruction">
            <SidebarIcon Icon={GoMail} />
          </Link>
          <Link to="underConstruction">
            <SidebarIcon Icon={GoBookmark} />
          </Link>
          <Link to="underConstruction">
            <SidebarIcon Icon={BsSlashSquare} />
          </Link>
          <Link to={`profile/${UserName}`}>
            <img
              src={Photo}
              alt={`${UserName} avatar`}
              className="size-8 rounded-full mt-2 mb-2 ml-1"
            />
          </Link>
          <Link to="LogOut">
            <SidebarIcon Icon={IoLogOutOutline} />
          </Link>
        </div>

        <button
          className="w-10 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition duration-200 mt-4 p-2 mr-1"
          onClick={openModal}
        >
          <BsFeather className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};
