import { Tweet, Post } from '../../Posts/Components';
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../Posts/Context/index.js';
import { LogInContext } from '../../LogIn/Context/index.js';
import { LoadingComponent } from '../../Common/Components';
import InfiniteScroll from 'react-infinite-scroll-component';

const tabsObj = {
  forYou: 'For you',
  following: 'Following',
};

export const Feed = () => {
  const { GetPosts, getPostsByFollowingUsers, posts, postsFollowing } =
    useContext(PostsContext);
  const { User } = useContext(LogInContext);
  const [IsGettingData, SetIsGettingData] = useState(true);
  const [currentTab, setCurrentTab] = useState(tabsObj.forYou);
  const [allRecordsLoaded, setAllRecordsLoaded] = useState(false);

  const fetchData = async () => {
    let res;
    if (currentTab === tabsObj.forYou) {
      res = await GetPosts(User);
    } else {
      res = await getPostsByFollowingUsers(User);
    }

    setAllRecordsLoaded(res.resposeLength === 0);
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
    SetIsGettingData(true);
    fetchData().finally(() => {
      SetIsGettingData(false);
    });
  }, [currentTab]);

  return (
    <>
      <div className="w-[634px]">
        <div className="border-l-2 border-r-2 flex text-center h-11  items-center justify-center">
          <div
            onClick={() => {
              setCurrentTab(tabsObj.forYou);
            }}
            className="flex-1 cursor-pointer"
          >
            <span
              className={
                currentTab === tabsObj.forYou ? 'border-b-4 border-sky-500' : ''
              }
            >
              For you
            </span>
          </div>
          <div className="border-2 min-h-full rounded-b-full rounded-t-full border-gray-400"></div>
          <div
            onClick={() => {
              setCurrentTab(tabsObj.following);
            }}
            className="flex-1 cursor-pointer"
          >
            <span
              className={
                currentTab === tabsObj.following
                  ? 'border-b-4 border-sky-500'
                  : ''
              }
            >
              Following
            </span>
          </div>
        </div>
        <Tweet />
        {IsGettingData ? (
          <LoadingComponent />
        ) : (
          <>
            {currentTab === tabsObj.forYou ? (
              <>
                <InfiniteScroll
                  dataLength={posts.length}
                  next={fetchData}
                  hasMore={!allRecordsLoaded}
                  loader={notification('Loading...', 'Loading.svg')}
                  endMessage={notification(
                    'You reached the end',
                    'InboxEmpty.png'
                  )}
                >
                  {posts.map((post) => (
                    <Post key={post._id} PostInfo={post} />
                  ))}
                </InfiniteScroll>
              </>
            ) : (
              <>
                <InfiniteScroll
                  dataLength={postsFollowing.length}
                  next={fetchData}
                  hasMore={!allRecordsLoaded}
                  loader={notification('Loading...', 'Loading.svg')}
                  endMessage={notification(
                    'You reached the end',
                    'InboxEmpty.png'
                  )}
                >
                  {postsFollowing.map((post) => (
                    <Post key={post._id} PostInfo={post} />
                  ))}
                </InfiniteScroll>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
