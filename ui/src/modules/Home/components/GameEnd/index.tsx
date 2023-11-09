import React, { useContext, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/Button';
import { Actions, GamePopup } from '@/modules/styled';
import { GameContext } from '@/contexts/game.context';
import { WinnerState } from '@/interfaces/useGetGames';
import useRequestEndMatch from '@/hooks/useRequestEndMatch';
import useAsyncEffect from 'use-async-effect';
import { ellipsisCenter } from 'tc-formatter';

const GameEnd = React.memo(() => {
  const { resetGame, gameInfo, setShowCreateRoom, playerState, roomInfo } = useContext(GameContext);

  const { onRequestEndMatch } = useRequestEndMatch();

  const requestEndGame = async () => {
    if (gameInfo?.winner === (gameInfo?.myRolePlayer as any)) {
      await onRequestEndMatch(false);
    }
  };

  const winnerAddress = useMemo(() => {
    if (gameInfo?.infoForWatcher) {
      if (gameInfo?.winner === '1') {
        return gameInfo?.infoForWatcher?.player1;
      }
      if (gameInfo?.winner === '2') {
        return gameInfo?.infoForWatcher?.player2;
      }
      return '';
    }
    return '';
  }, [gameInfo]);

  const isWatcher = useMemo(() => {
    if (gameInfo?.infoForWatcher) {
      return true;
    }
    return false;
  }, [gameInfo]);

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
            style={{ fontSize: 23 }}
          >
            {isWatcher &&
              (gameInfo?.winner === WinnerState.Draw
                ? 'No Winner'
                : `Winner is ${ellipsisCenter({ str: winnerAddress, limit: 5 })}`)}
            {!isWatcher &&
              (gameInfo?.winner === WinnerState.Draw
                ? 'No Winner :/'
                : gameInfo?.winner === (gameInfo?.myRolePlayer as any)
                ? 'Win !! :)'
                : 'Lose !! :(')}
          </motion.h5>
          <Actions>
            {/* <motion.div
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
                {isWatcher ? 'Play game' : 'Replay'}
              </Button>
            </motion.div> */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { delay: 1.5, duration: 0.3 },
              }}
            >
              <Button onClick={resetGame} variants="outline">
                Close
              </Button>
            </motion.div>
          </Actions>
        </motion.div>
      </GamePopup>
    </AnimatePresence>
  );
});

export default GameEnd;
