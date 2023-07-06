import styled from 'styled-components';
import React from 'react';
import CreateRoomIcon from '@/images/create-room.svg';
import JoinRoomIcon from '@/images/join-room.svg';

const ButtonGame = styled.img`
  max-width: 250px;
  cursor: pointer;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  :hover {
    opacity: 0.9;
    transform: rotateY(8deg);
    transition: all 0.2s linear;
  }
`;

const ButtonCreateRoom = React.memo((props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <ButtonGame src={CreateRoomIcon} {...props} />;
});

const ButtonJoinRoom = React.memo((props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <ButtonGame src={JoinRoomIcon} {...props} />;
});

export { ButtonCreateRoom, ButtonJoinRoom };
