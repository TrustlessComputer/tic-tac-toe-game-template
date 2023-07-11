import { motion } from 'framer-motion';
import * as S from './styled';
import React, { useContext } from 'react';
import { GameContext } from '@/contexts/game.context';

interface IProps {
  ind: string;
  updateSquares: (ind: string) => void;
  clsName: string;
}

const Square = ({ ind, updateSquares, clsName }: IProps) => {
  const { lastMoveIndex } = useContext(GameContext);
  const isLastMove = React.useMemo(() => {
    return lastMoveIndex !== undefined && lastMoveIndex === Number(ind);
  }, [lastMoveIndex, ind]);

  const handleClick = () => {
    updateSquares(ind);
  };
  return (
    <S.Container initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={handleClick} isLastMove={isLastMove}>
      {clsName && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className={clsName} />}
    </S.Container>
  );
};

export default Square;
