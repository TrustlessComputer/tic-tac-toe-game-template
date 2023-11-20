import React, { useContext, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/Button';
import { Actions, GamePopup } from '@/modules/styled';
import { GameContext } from '@/contexts/game.context';
import { WinnerState } from '@/interfaces/useGetGames';
import useRequestEndMatch from '@/hooks/useRequestEndMatch';
import useAsyncEffect from 'use-async-effect';
import { ellipsisCenter } from 'tc-formatter';
import { PARENT_PATH, PARENT_PATH_V2 } from '@/configs';

const GameEnd = React.memo(() => {
  const { resetGame, gameInfo, setShowCreateRoom, playerState, roomInfo } = useContext(GameContext);

  const { onRequestEndMatch } = useRequestEndMatch();

  const requestEndGame = async () => {
    if (gameInfo?.winner === (gameInfo?.myRolePlayer as any)) {
      await onRequestEndMatch(false);
    }
  };

  const winnerName = useMemo(() => {
    if (gameInfo?.infoForWatcher) {
      if (gameInfo?.winner === '1') {
        return gameInfo?.player1?.name;
      }
      if (gameInfo?.winner === '2') {
        return gameInfo?.player2?.name;
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
          style={{ textAlign: 'center' }}
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
            {isWatcher && (gameInfo?.winner === WinnerState.Draw ? 'No Winner' : `Winner is ${winnerName}`)}
            {!isWatcher &&
              (gameInfo?.winner === WinnerState.Draw
                ? 'No Winner :/'
                : gameInfo?.winner === (gameInfo?.myRolePlayer as any)
                ? 'Win !! :)'
                : 'Lose !! :(')}
            <div className="reward" style={{ marginTop: '20px' }}>
              {roomInfo?.reward} BTC
            </div>
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
              <Button
                onClick={() => {
                  resetGame();
                  window.parent.postMessage({ tokenRoom: roomInfo?.roomId, status: 'CLOSE' }, PARENT_PATH);
                  window.parent.postMessage({ tokenRoom: roomInfo?.roomId, status: 'CLOSE' }, PARENT_PATH_V2);
                }}
                variants="outline"
              >
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
