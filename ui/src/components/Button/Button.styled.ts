import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const StyledButton = styled.button`
  border-width: 1px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-transform: uppercase;
  font-weight: 700;

  :hover {
    transform: scaleX(1.02);
    transition: all 0.2s linear;
  }

  &.underline {
    background-color: transparent;
    text-decoration: underline;
    border: 1px solid transparent;
    color: ${({ theme }) => theme['btn-primary']};
  }

  &.ghost {
    background-color: transparent;
    text-decoration: none;
    border: 1px solid transparent;
    color: ${({ theme }) => theme['btn-primary']};
  }

  &.primary {
    background-color: ${({ theme }) => theme['btn-primary']};
    color: ${({ theme }) => theme['txt-1']};
  }

  &.outline {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme['btn-primary']};
    color: ${({ theme }) => theme['btn-primary']};
  }

  &.outline-negative {
    background-color: transparent;
    border: 1px solid red;
    color: red;
  }

  &.small {
    padding: ${px2rem(11)} ${px2rem(16)};
    font-size: ${px2rem(16)};
  }

  &.normal {
    padding: ${px2rem(11)} ${px2rem(34)};
    font-size: ${px2rem(16)};
  }

  &.large {
    padding: ${px2rem(11)} ${px2rem(48)};
    font-size: ${px2rem(16)};
  }

  &.stretch {
    padding: ${px2rem(11)} ${px2rem(20)};
    width: 100%;
    font-size: ${px2rem(16)};
  }

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(1.01);
  }

  &:disabled {
    opacity: 0.6;
    transform: scale(1);
  }

  .spinner {
    margin-left: 12px;
  }
`;
