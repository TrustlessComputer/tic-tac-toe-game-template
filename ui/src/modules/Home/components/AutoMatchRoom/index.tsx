import React, { useContext } from 'react';
import useContractSigner from '@/hooks/useContractSigner';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '@/components/Spinner';
import { GamePopup } from '@/modules/styled';
import { GameContext } from '@/contexts/game.context';
import { WalletContext } from '@/contexts/wallet.context';
import throttle from 'lodash/throttle';
import Button from '@/components/Button';
import useFindMatch from '@/hooks/useFindMatch';

const JoinRoom = React.memo(() => {
  const contractSigner = useContractSigner();
  const { keySet } = useContext(WalletContext);
  const { resetGame } = useContext(GameContext);
  const { onFindMatch, gameState } = useFindMatch();

  const handleAutoMatchRoom = async () => {
    if (!keySet.address || !contractSigner) return;
    await onFindMatch();
  };

  const throttleAutoMatchRoom = throttle(handleAutoMatchRoom, 500);

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
            Auto matching
          </motion.h2>
          {gameState.loading && <Spinner />}
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { delay: 1.5, duration: 0.3 },
            }}
            className="actions"
          >
            <Button className="button" variants="outline" onClick={resetGame}>
              Cancel
            </Button>
            <Button className="button" onClick={throttleAutoMatchRoom} disabled={gameState.loading}>
              Match
            </Button>
          </motion.div>
        </motion.div>
      </GamePopup>
    </AnimatePresence>
  );
});

export default JoinRoom;
