export const LoadingComponent = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-black w-[634px] animation">
        <div className="w-[634px] bg-black min-h-full flex flex-col items-center justify-center animate-pulse">
          <img src="/Loading.svg" className="size-7/12" />
        </div>
      </div>
    </>
  );
};
