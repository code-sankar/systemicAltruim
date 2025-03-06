import React from "react";

function TweetSection() {
  return (
    <section className="bg-[#0d0a1a] text-white py-12 px-4">
      <div className="w-4/5 mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          You are just one{" "}
          <span className="text-purple-400">Startupathon Challenge</span> away
          from an exciting career
        </h2>
        <p className="text-gray-300 mb-6">
          as the <span className="text-purple-400">founder of a company</span>,
          with a full salary and ownership in what you build.
        </p>
        <div className="flex justify-center">
          <img
            src="https://pbs.twimg.com/media/GS7YuiNWoAA2tyG?format=jpg&name=small"
            alt="X Post Image"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      </div>
    </section>
  );
}

export default TweetSection;
