import { useAppSelector } from '@/state/hooks';
import { FC } from 'react';
import SVG from 'react-inlinesvg';
import { StyledIconSVG } from './IconSVG.styled';
import { isDarkSelector } from '@/state/application/selector';

export type IconSVGProps = {
  src: string;
  className?: string;
  maxWidth?: string;
  maxHeight?: string;
  iconType?: 'fill' | 'stroke';
  color?: string;
  onClick?: (e: any) => void;
  useDarkmode?: boolean;
};

const IconSVG: FC<IconSVGProps> = ({
  src,
  className = '',
  maxWidth = '',
  maxHeight = '',
  iconType = undefined,
  color = '',
  onClick,
  useDarkmode = false,
}) => {
  const darkMode = useAppSelector(isDarkSelector);
  const wrapSrc = useDarkmode && !darkMode && src.includes('-dark.svg') ? src.replaceAll('-dark', '-light') : src;
  return (
    <StyledIconSVG
      className={className}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      type={iconType}
      color={color}
      onClick={onClick}
    >
      <SVG src={wrapSrc} />
    </StyledIconSVG>
  );
};

export default IconSVG;
