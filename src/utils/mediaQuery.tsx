import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../theme';

// <Mobile> component to wrap things only for mobile
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

// <Desktop> component to wrap things only for desktop
const Desktop = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: breakpoints[768] });
  return isNotMobile ? children : null;
};

export { Desktop, Mobile };
