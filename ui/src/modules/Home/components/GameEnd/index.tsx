import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/Button';
import { Actions, GamePopup } from '@/modules/styled';
import { GameContext } from '@/contexts/game.context';
import { WinnerState } from '@/interfaces/useGetGames';
import useRequestEndMatch from '@/hooks/useRequestEndMatch';
import useAsyncEffect from 'use-async-effect';

const GameEnd = React.memo(() => {
  const { resetGame, gameInfo, setShowCreateRoom, playerState } = useContext(GameContext);

  const { onRequestEndMatch } = useRequestEndMatch();

  const requestEndGame = async () => {
    if (gameInfo?.winner === (gameInfo?.myRolePlayer as any)) {
      await onRequestEndMatch(false);
    }
  };

  useAsyncEffect(requestEndGame, []);

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
          <motion.h5
            initial={{ scale: 0, y: 100 }}
            animate={{
              scale: 1,
              y: 0,
              transition: {
                y: { delay: 0.7 },
                duration: 0.7,
              },
            }}
            style={{ fontSize: 32 }}
          >
            {gameInfo?.winner === WinnerState.Draw
              ? 'No Winner :/'
              : gameInfo?.winner === (gameInfo?.myRolePlayer as any)
              ? 'Win !! :)'
              : 'Lose !! :('}
          </motion.h5>
          <Actions>
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { delay: 1.5, duration: 0.3 },
              }}
            >
              <Button
                disabled={!playerState.isAvailable}
                onClick={() => {
                  resetGame();
                  setShowCreateRoom(true);
                }}
              >
                Replay
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { delay: 1.5, duration: 0.3 },
              }}
            >
              <Button onClick={resetGame} variants="outline">
                Back
              </Button>
            </motion.div>
          </Actions>
        </motion.div>
      </GamePopup>
    </AnimatePresence>
  );
});

export default GameEnd;
