import { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { BiWorld, BiPoll } from 'react-icons/bi';
import { GoFileMedia } from 'react-icons/go';
import { MdOutlineGifBox } from 'react-icons/md';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { IoLocationOutline } from 'react-icons/io5';
import { CreatePost } from '../Controller';
import { LogInContext } from '../../LogIn/Context';
import { useContext } from 'react';
import { PostsContext } from '../Context/PostsContext';
import { toast } from 'sonner';

export const Tweet = () => {
  const { InsertCreatedPost, CloseModal } = useContext(PostsContext);
  const { User, Photo, UserName, Name } = useContext(LogInContext);
  const textAreaRef = useRef();
  const [textAreaVal, setTextAreaVal] = useState('');
  const onTextAreaChange = (e) => {
    setTextAreaVal(e.target.value);
  };

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [textAreaVal]);

  const OnCreate = async () => {
    const result = await CreatePost(textAreaVal, User);
    if (!result.ok) {
      toast.error('Post creating failed!');
      return;
    }
    const object = {
      ...result.data,
      userInfo: {
        name: Name,
        userName: UserName,
        photo: Photo,
      },
    };

    toast.success('Post created successfully!');
    InsertCreatedPost(object);
    CloseModal();
    setTextAreaVal('');
  };

  return (
    <>
      <div className="flex px-4 border-2 w-[634px] min-h-[124px] bg-black text-white">
        <div className="pt-3 mr-2">
          <img src={Photo} className=" w-10 h-10 rounded-full border-none" />
        </div>
        <div className="flex-1 flex flex-col justify-center pt-2">
          <div className="py-3">
            <textarea
              className="resize-none border-none outline-0 text-custom w-[515px] bg-black"
              placeholder="What is happening?!"
              value={textAreaVal}
              onChange={onTextAreaChange}
              rows="1"
              ref={textAreaRef}
              maxLength={280}
            ></textarea>
          </div>
          <div className="pb-2">
            <div className="flex pb-3  text-sky-500  cursor-pointer">
              <a className="flex items-center space-x-2">
                <BiWorld className="w-4 h-4" />
                <span className="text-sm font-bold">Everyone can reply</span>
              </a>
            </div>
            <hr />
            <div className="flex mt-2">
              <div className="flex-1 flex text-sky-500 gap-4">
                <GoFileMedia
                  data-tooltip-id="tooltip-media"
                  data-tooltip-content="Media"
                  data-tooltip-place="bottom"
                  className="w-5 h-5 cursor-pointer outline-none"
                />
                <Tooltip id="tooltip-media" />

                <MdOutlineGifBox
                  data-tooltip-id="tooltip-gif"
                  data-tooltip-content="GIF"
                  data-tooltip-place="bottom"
                  className="w-5 h-5 cursor-pointer outline-none"
                />
                <Tooltip id="tooltip-gif" />

                <BiPoll
                  data-tooltip-id="tooltip-poll"
                  data-tooltip-content="Poll"
                  data-tooltip-place="bottom"
                  className="w-5 h-5 cursor-pointer outline-none"
                />
                <Tooltip id="tooltip-poll" />

                <HiOutlineEmojiHappy
                  data-tooltip-id="tooltip-emoji"
                  data-tooltip-content="Emoji"
                  data-tooltip-place="bottom"
                  className="w-5 h-5 cursor-pointer outline-none"
                />
                <Tooltip id="tooltip-emoji" />

                <RiCalendarScheduleLine
                  data-tooltip-id="tooltip-schedule"
                  data-tooltip-content="Schedule"
                  data-tooltip-place="bottom"
                  className="w-5 h-5 cursor-pointer outline-none"
                />
                <Tooltip id="tooltip-schedule" />

                <IoLocationOutline
                  data-tooltip-id="tooltip-location"
                  data-tooltip-content="Location"
                  data-tooltip-place="bottom"
                  className="w-5 h-5 cursor-pointer outline-none"
                />

                <Tooltip id="tooltip-location" />
              </div>
              <div>
                <button
                  className="min-h-9 min-w-9 rounded-t-full rounded-b-full bg-sky-500 hover:bg-sky-600 duration-200 outline-none px-4 text-white font-bold
                  text-sm"
                  onClick={OnCreate}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
