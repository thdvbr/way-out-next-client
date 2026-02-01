import React, { useEffect, useState } from 'react';
import { RadioLayout, ThemeWrapper, Footer, Thumbnail } from '../../components';

// 1. skeleton, layout
// 2. bring the data in
// 3. feed the data in
// 4. state
// 5. desktop / mobile?

export const Radio = ({ data = {}, preview }) => {
  return (
    <ThemeWrapper theme="dark">
      <RadioLayout theme="dark" preview={preview}>
        <div
          className="flex flex-col gap-8 lg:flex-row"
          style={{ height: '400px' }}>
          {/* TODO: Calculate height for this container you need fixed heigh  */}
          {/* Left Section */}
          {/* <!-- Main content area --> */}
          <section className="flex flex-col w-full h-full lg:w-1/2">
            <div className="flex-shrink-0 bg-blue-700 fixedmetadata">
              <div className="mb-4">date</div>
              <h1 className="mb-2 text-4xl">title</h1>
              <h2 className="mb-4 text-xl">subtitle</h2>
              <div className="mb-4">tags</div>
              <hr className="mb-6 border-white" />
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto bg-green-500">
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
                  <div>Track 5</div>
                  <div>Track 6</div>
                  <div>Track 7</div>
                  <div>Track 8</div>
                  <div>Track 9</div>
                  <div>Track 10</div>
                  <div>Track 11</div>
                  <div>Track 12</div>
                  <div>Track 13</div>
                  <div>Track 14</div>
                  <div>Track 15</div>
                  <div>Track 16</div>
                  <div>Track 17</div>
                  <div>Track 18</div>
                  <div>Track 19</div>
                  <div>Track 20</div>
                  <div>Track 21</div>
                  <div>Track 22</div>
                  <div>Track 23</div>
                  <div>Track 24</div>
                  <div>Track 25</div>
                </div>
                {/* Repeat for more tracks */}
              </div>
            </div>
          </section>

          {/* Right Section */}
          <section className="w-full bg-pink-500 lg:w-1/2">
            <div>thumbnail</div>
          </section>
        </div>

        {/* Sticky Player
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black border-t border-white">
          sticky player
        </div> */}
      </RadioLayout>
    </ThemeWrapper>
  );
};

export default Radio;
