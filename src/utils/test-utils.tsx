import React from 'react';
import { render as testingLibraryRender } from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';

const renderResponsive = (ui, { isDesktop = false, ...options } = {}) => {
  const Wrapper = props => {
    return (
      <ResponsiveContext.Provider value={{ width: isDesktop ? 768 : 767 }} {...props}>
        {props.children}
      </ResponsiveContext.Provider>
    );
  };
  return testingLibraryRender(ui, { wrapper: Wrapper, ...options });
};

const render = renderResponsive;

export { render, renderResponsive };
