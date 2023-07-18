import { ReactSVG } from 'react-svg';
import React from 'react';
import px2rem from '@/utils/px2rem';

type IProps = {
  svgUrl: string;
  className?: string;
  size?: number;
  fullWidth?: boolean;
  onClick?: () => void;
};

const SvgInset: React.FC<IProps> = ({ svgUrl, className, size, onClick, fullWidth = false }) => {
  return (
    <ReactSVG
      onClick={onClick}
      className={className}
      src={svgUrl}
      beforeInjection={(svg): void => {
        if (size) {
          svg.setAttribute('height', `100%`);
          svg.setAttribute('width', `${fullWidth ? '100%' : px2rem(size)}`);
          svg.style.minWidth = `${size}`;
          svg.style.minHeight = `100%`;
          svg.style.width = `${fullWidth ? '100%' : px2rem(size)}`;
          svg.style.height = `100%`;
        }
      }}
    />
  );
};

export default SvgInset;
