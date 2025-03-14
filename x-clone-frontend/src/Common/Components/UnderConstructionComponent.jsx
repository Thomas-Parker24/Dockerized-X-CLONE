export const UnderConstructionComponent = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-black w-[634px]">
        <div className="w-[634px] bg-black min-h-full flex flex-col items-center justify-center">
          <img src="/UnderConstruction.png" className="size-auto" />
          <div className="border-2 border-b-white rounded-full w-3/4 mb-4"></div>
          <p className="text-white font-extrabold text-xl">
            This site is not available
          </p>
          <p className="text-white mb-8 text-lg font-bold">
            We are working on it!
          </p>
        </div>
      </div>
    </>
  );
};
