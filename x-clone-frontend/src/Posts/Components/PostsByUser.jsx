import { Post } from '../../Posts/Components';
import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../Posts/Context/index.js';
import { LogInContext } from '../../LogIn/Context/index.js';
import { LoadingComponent } from '../../Common/Components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

export const PostsByUser = () => {
  const { postsCreatedByUser, GetPostsCreatedByUser } =
    useContext(PostsContext);
  const { User } = useContext(LogInContext);
  const [IsGettingData, SetIsGettingData] = useState(true);
  const [allRecordsLoaded, setAllRecordsLoaded] = useState(false);
  const { userName } = useParams();

  const fetchData = async () => {
    const response = await GetPostsCreatedByUser(User, userName);
    setAllRecordsLoaded(response.resposeLength === 0);
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
    fetchData().then(() => {
      SetIsGettingData(false);
    });
  }, []);

  return (
    <>
      <div className="w-[634px]">
        {IsGettingData ? (
          <LoadingComponent />
        ) : (
          <>
            <InfiniteScroll
              dataLength={postsCreatedByUser?.length}
              next={fetchData}
              hasMore={!allRecordsLoaded}
              loader={notification('Loading...', 'Loading.svg')}
              endMessage={notification('You reached the end', 'InboxEmpty.png')}
            >
              {postsCreatedByUser?.map((post) => (
                <Post key={post._id} PostInfo={post} />
              ))}
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
};
