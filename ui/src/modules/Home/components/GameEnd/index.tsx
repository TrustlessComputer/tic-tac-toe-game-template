import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/Button';
import { GamePopup } from '@/modules/styled';
import { GameContext } from '@/contexts/game.context';
import { WinnerState } from '@/interfaces/useGetGames';

const GameEnd = React.memo(() => {
  const { resetGame, gameInfo } = useContext(GameContext);

  return (
    <AnimatePresence>
      <GamePopup
        key="parent-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="game-popup"
      >
        <motion.div
          key={'child-box'}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="text"
        >
          <motion.h2
            initial={{ scale: 0, y: 100 }}
            animate={{
              scale: 1,
              y: 0,
              transition: {
                y: { delay: 0.7 },
                duration: 0.7,
              },
            }}
          >
            {gameInfo?.winner === WinnerState.Draw
              ? 'No Winner :/'
              : gameInfo?.winner === (gameInfo?.myRolePlayer as any)
              ? 'Win !! :)'
              : 'Lose !! :('}
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { delay: 1.5, duration: 0.3 },
            }}
          >
            <Button onClick={resetGame}>Reset Game</Button>
          </motion.div>
        </motion.div>
      </GamePopup>
    </AnimatePresence>
  );
});

export default GameEnd;
