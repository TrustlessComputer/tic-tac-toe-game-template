import React, { useContext } from 'react';
import useContractSigner from '@/hooks/useContractSigner';
import debounce from 'lodash/debounce';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import { GamePopup } from '@/modules/styled';
import useFindMatch from '@/hooks/useFindMatch';
import { GameContext } from '@/contexts/game.context';

const CreateRoom = React.memo(() => {
  const contractSigner = useContractSigner();
  const { onFindMatch, gameState } = useFindMatch();
  const { resetGame } = useContext(GameContext);

  const debounceCreateGameID = React.useCallback(debounce(onFindMatch, 1000), []);

  React.useEffect(() => {
    if (!contractSigner) return;
    debounceCreateGameID();
  }, [contractSigner]);

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
          key="child-box"
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
            {gameState.gameID && gameState.loading ? 'Waiting for user' : 'Create the game'}
          </motion.h2>
          {gameState.loading && <Spinner />}
          {!gameState.loading && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { delay: 1, duration: 0.3 },
              }}
            >
              <Button className="button" variants="outline" onClick={resetGame}>
                Cancel
              </Button>
            </motion.div>
          )}
        </motion.div>
      </GamePopup>
    </AnimatePresence>
  );
});

export default CreateRoom;
