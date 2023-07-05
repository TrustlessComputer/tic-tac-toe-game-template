import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

const BaseText = styled.p<{
  color: string | undefined;
  align: string;
  maxWidth: string | number;
}>`
  color: ${({ color, theme }) => (color ? (theme as any)[color] : theme['txt-primary'])};
  text-align: ${({ align }) => align};
  max-width: ${({ maxWidth }) => maxWidth};
  line-height: 140%;

  // FONT-SIZE
  &.size-12 {
    font-size: ${px2rem(12)};
  }
  &.size-14 {
    font-size: ${px2rem(14)};
  }
  &.size-16 {
    font-size: ${px2rem(16)};
  }
  &.size-18 {
    font-size: ${px2rem(18)};
  }
  &.size-20 {
    font-size: ${px2rem(20)};
  }
  &.size-24 {
    font-size: ${px2rem(24)};
  }
  &.size-36 {
    font-size: ${px2rem(36)};
  }
  &.size-40 {
    font-size: ${px2rem(40)};
  }
  &.size-48 {
    font-size: ${px2rem(48)};
  }
  &.size-56 {
    font-size: ${px2rem(56)};
  }
  &.size-72 {
    font-size: ${px2rem(72)};
  }
  &.size-96 {
    font-size: ${px2rem(96)};
  }
  &.size-128 {
    font-size: ${px2rem(128)};
  }

  // FONT-WEIGHT
  &.weight-bold {
    font-weight: 700;
  }
  &.weight-semibold {
    font-weight: 600;
  }
  &.weight-medium {
    font-weight: 500;
  }
  &.weight-regular {
    font-weight: 400;
  }
  &.weight-light {
    font-weight: 300;
  }
`;

export { BaseText };
