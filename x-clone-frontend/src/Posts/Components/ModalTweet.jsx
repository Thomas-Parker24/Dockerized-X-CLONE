import ReactModal from 'react-modal';
import { Tooltip } from 'react-tooltip';
import { Tweet } from './Tweet';
import { IoMdClose } from 'react-icons/io';
import { useContext } from 'react';
import { PostsContext } from '../Context/PostsContext';

ReactModal.setAppElement(document.getElementById('root'));

export const ModalTweet = () => {
  const { ModalIsOpen, CloseModal } = useContext(PostsContext);

  return (
    <>
      <ReactModal
        isOpen={ModalIsOpen}
        style={{
          content: {
            top: '20%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'black',
          },
        }}
      >
        <div className="flex">
          <div className="flex-1" onClick={CloseModal}>
            <IoMdClose
              data-tooltip-id="tooltip-close"
              data-tooltip-content="Close"
              data-tooltip-place="bottom"
              className="w-5 h-5 rounded-full cursor-pointer outline-none text-white"
            />
            <Tooltip id="tooltip-close" />
          </div>
          <span className="cursor-pointer font-black text-sky-500">Drafts</span>
        </div>
        <Tweet />
      </ReactModal>
    </>
  );
};
