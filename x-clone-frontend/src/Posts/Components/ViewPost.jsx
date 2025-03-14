import { Tooltip } from 'react-tooltip';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { TbMessageCircle } from 'react-icons/tb';
import { LiaRetweetSolid } from 'react-icons/lia';
import { CiHeart, CiBookmark } from 'react-icons/ci';
import { BiBarChart } from 'react-icons/bi';
import { RiShare2Line } from 'react-icons/ri';
import { useContext, useEffect, useState } from 'react';
import { getPostById } from '../Controller';
import { LogInContext } from '../../LogIn/Context';
import { useParams } from 'react-router-dom';
import { GetTimeDifference } from '../../Common/Functions';
import { LoadingComponent } from '../../Common/Components';

const ViewPost = () => {
  const { User } = useContext(LogInContext);
  const [post, setPost] = useState(undefined);
  const [IsGettingData, SetIsGettingData] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    SetIsGettingData(true);
    getPostById(User, id)
      .then((res) => {
        setPost(res.response);
      })
      .finally(() => {
        SetIsGettingData(false);
      });
  }, []);

  return (
    <div className="min-h-dvh">
      <h2 className="font-medium text-2xl mt-3 mb-1">Post</h2>
      {IsGettingData ? (
        <>
          <LoadingComponent />
        </>
      ) : (
        <>
          <div className="flex px-4 border-l-2 border-t-2 border-r-2 border-b-2 w-[634px] min-h-[124px]">
            <div className="pt-3 mr-2">
              <img
                src={post?.userInfo?.photo}
                alt={`${post?.userInfo?.userName}'s profile`}
                className=" w-10 h-10 rounded-full border-none"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center pt-2">
              <div className="flex">
                <span className="flex-1">{`${post?.userInfo?.name} @${
                  post?.userInfo?.userName
                } · ${GetTimeDifference(post?.createdAt)}`}</span>
                <HiOutlineDotsHorizontal
                  data-tooltip-id="tooltip-more"
                  data-tooltip-content="More"
                  data-tooltip-place="bottom"
                  className="w-5 h-5 cursor-pointer"
                />
                <Tooltip id="tooltip-more" />
              </div>
              <div className="py-3">
                <span>{post?.content}</span>
              </div>
              <div className="pb-2">
                <div className="flex mt-2">
                  <div className="flex-1 flex text-gray-500 gap-24">
                    <div className="flex items-center">
                      <TbMessageCircle
                        data-tooltip-id="tooltip-reply"
                        data-tooltip-content="Reply"
                        data-tooltip-place="bottom"
                        className="w-5 h-5 cursor-pointer outline-none"
                      />
                      <Tooltip id="tooltip-reply" />
                      <span>4</span>
                    </div>

                    <div className="flex items-center">
                      <LiaRetweetSolid
                        data-tooltip-id="tooltip-repost"
                        data-tooltip-content="Repost"
                        data-tooltip-place="bottom"
                        className="w-5 h-5 cursor-pointer outline-none"
                      />
                      <Tooltip id="tooltip-repost" />
                      <span>1</span>
                    </div>

                    <div className="flex items-center">
                      <CiHeart
                        data-tooltip-id="tooltip-like"
                        data-tooltip-content="Like"
                        data-tooltip-place="bottom"
                        className="w-5 h-5 cursor-pointer outline-none"
                      />
                      <Tooltip id="tooltip-like" />
                      <span>267</span>
                    </div>

                    <div className="flex items-center">
                      <BiBarChart
                        data-tooltip-id="tooltip-view"
                        data-tooltip-content="View"
                        data-tooltip-place="bottom"
                        className="w-5 h-5 cursor-pointer outline-none"
                      />
                      <Tooltip id="tooltip-view" />
                      <span>10K</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CiBookmark
                      data-tooltip-id="tooltip-bookmark"
                      data-tooltip-content="Bookmark"
                      data-tooltip-place="bottom"
                      className="w-5 h-5 cursor-pointer outline-none"
                    />
                    <Tooltip id="tooltip-bookmark" />

                    <RiShare2Line
                      data-tooltip-id="tooltip-share"
                      data-tooltip-content="Share"
                      data-tooltip-place="bottom"
                      className="w-5 h-5 cursor-pointer outline-none"
                    />

                    <Tooltip id="tooltip-share" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewPost;
