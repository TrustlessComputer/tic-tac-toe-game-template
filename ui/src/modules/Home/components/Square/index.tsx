import { motion } from 'framer-motion';
import * as S from './styled';

interface IProps {
  ind: string;
  updateSquares: (ind: string) => void;
  clsName: string;
}

const Square = ({ ind, updateSquares, clsName }: IProps) => {
  const handleClick = () => {
    updateSquares(ind);
  };
  return (
    <S.Container initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={handleClick}>
      {clsName && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className={clsName} />}
    </S.Container>
  );
};

export default Square;
