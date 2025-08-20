import React from 'react';
import Header from '../components/Header.jsx';
import filipe from '../assets/filipe.jpg';
function Index() {
  return (
    <>
      <Header />
      <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
        <div className="row-start-2 lg:row-auto">
          <h1 className="mb-4 lg:text-5xl !leading-tight text-3xl text-center lg:text-left">
            Hi, I'm Filipe <br /> and this is my Lab.
          </h1>
          <h2
            variant="lead"
            className="mb-4 text-gray-500 md:pr-16 xl:pr-28 text-center lg:text-left"
          >
            I'm Filipe Cavalcante and this is my Lab.
          </h2>
        </div>
        <img
          alt="Filipe"
          src={filipe}
          className="h-[25rem] lg:h-[36rem] rounded-full w-full object-cover shadow-lg lg:h-[40rem] lg:w-[40rem] lg:rounded-lg"
        />
      </div>
    </>
  );
}

export default Index;
