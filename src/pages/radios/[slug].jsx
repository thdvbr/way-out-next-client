import React, { useEffect, useState } from 'react';
import { PostLayout, ThemeWrapper, Footer, Thumbnail } from '../../components';

// 1. skeleton, layout
// 2. bring the data in
// 3. feed the data in
// 4. state
// 5. desktop / mobile?

export const Radio = ({ data = {}, preview }) => {
  return (
    <ThemeWrapper theme="dark">
      <PostLayout theme="dark">
        <div className="flex flex-col min-h-screen gap-8 lg:flex-row">
          {/* Left Section */}
          <section className="w-full lg:w-1/2">
            <div className="mb-4">date</div>
            <h1 className="mb-2 text-4xl">title</h1>
            <h2 className="mb-4 text-xl">subtitle</h2>
            <div className="mb-4">tags</div>
            <hr className="mb-6 border-white" />

            {/* Scrollable Container */}
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              {/* Play Button + Description Side by Side */}
              <div className="flex gap-6 mb-6">
                <button className="px-6 py-3 text-black bg-white whitespace-nowrap h-fit">
                  play
                </button>

                <div className="flex-1">
                  <p>description</p>
                </div>
              </div>

              <hr className="my-6 border-white" />

              {/* Tracklist */}
              <div className="space-y-4">
                <h3 className="mb-4 text-2xl">Tracklist</h3>
                <div className="space-y-2">
                  <div className="font-bold">track title</div>
                  <div className="text-gray-400">artist</div>
                </div>
                {/* Repeat for more tracks */}
              </div>
            </div>
          </section>

          {/* Right Section */}
          <section className="w-full lg:w-1/2">
            <div>thumbnail</div>
          </section>
        </div>

        {/* Sticky Player */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-white">
          sticky player
        </div>
      </PostLayout>
      <Footer theme="dark" />
    </ThemeWrapper>
  );
};

export default Radio;
