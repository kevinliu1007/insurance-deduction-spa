import React from 'react';
import { animateScroll as scroll } from 'react-scroll'
import icon from '../assets/scroll-to-top.png';
import '../assets/ScrollToTopComponent.scss';

const ScrollToTopComponent: React.FC = ():JSX.Element => {
  const handleClick = () => {
    scroll.scrollToTop();
  };

  return (
    <input className="ScrollToTop" alt="Scroll to top" type="image" src={icon} onClick={handleClick}/>
  );
}

export default ScrollToTopComponent;
