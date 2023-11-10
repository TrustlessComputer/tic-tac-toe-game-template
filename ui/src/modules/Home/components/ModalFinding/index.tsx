import React, { useContext } from 'react';
import useContractSigner from '@/hooks/useContractSigner';
import debounce from 'lodash/debounce';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import { GamePopup } from '@/modules/styled';
import useFindMatch from '@/hooks/useFindMatch';
import { GameContext } from '@/contexts/game.context';
import useCancelMatch from '@/hooks/useCancelMatch';
import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';
import sleep from '@/utils/sleep';
import BannerImage from '@/images/banner.png';
import { Banner } from '@/modules/styled';
import { PARENT_PATH } from '@/configs';

const ModalFinding = React.memo(() => {
  const [canceling, setCanceling] = React.useState(false);

  const { onCancelMatch } = useCancelMatch();
  const { resetGame, playerState, roomInfo } = useContext(GameContext);

  const onCancelFinding = async () => {
    try {
      setCanceling(true);
      await onCancelMatch();
      await sleep(500);
      resetGame();

      window.parent.postMessage({ tokenRoom: roomInfo?.roomId, status: 'CLOSE' }, PARENT_PATH);
    } catch (error) {
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    } finally {
      setCanceling(false);
    }
  };

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
          <Banner src={BannerImage} />
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
          >
            Waiting for opponent to connect...
          </motion.h5>
          <Spinner />
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { delay: 1, duration: 0.3 },
            }}
          >
            <Button disabled={canceling} className="button" onClick={onCancelFinding}>
              {canceling ? 'Canceling...' : 'Cancel'}
            </Button>
          </motion.div>
        </motion.div>
      </GamePopup>
    </AnimatePresence>
  );
});

export default ModalFinding;
