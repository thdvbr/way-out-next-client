import React, { useEffect, useState } from 'react';
import { PostLayout, ThemeWrapper } from '../../components';

// 1. skeleton, layout
// 2. bring the data in
// 3. feed the data in
// 4. state
// 5. desktop / mobile?

export const Radio = ({ data = {}, preview }) => {
  return (
    <ThemeWrapper theme="dark">
      <PostLayout />{' '}
    </ThemeWrapper>
  );
};

export default Radio;
