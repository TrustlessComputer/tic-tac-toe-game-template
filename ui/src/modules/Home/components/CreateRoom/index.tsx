import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import { PARENT_PATH, PARENT_PATH_V2 } from '@/configs';
import { WalletContext } from '@/contexts/wallet.context';

const CreateRoom = React.memo(() => {
  const [canceling, setCanceling] = React.useState(false);
  const contractSigner = useContractSigner();
  const { onFindMatch, gameState } = useFindMatch();
  const { onCancelMatch } = useCancelMatch();
  const { resetGame, playerState, roomInfo } = useContext(GameContext);
  const { keySet } = useContext(WalletContext);
  const [actionText, setActionText] = useState(''); // State to hold action text

  const debounceCreateGameID = React.useCallback(debounce(onFindMatch, 1000), []);

  const onCancelFinding = async () => {
    try {
      setCanceling(true);
      await onCancelMatch();
      await sleep(500);
      resetGame();

      window.top?.postMessage({ tokenRoom: roomInfo?.roomId, status: 'CLOSE' }, '*');
    } catch (error) {
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    } finally {
      setCanceling(false);
    }
  };

  useEffect(() => {
    if (!contractSigner || !roomInfo || !keySet) return;
    const fetchActionText = async () => {
      try {
        let rs = await contractSigner?.getAlphaPendingMatches(roomInfo?.roomId);

        if (rs && rs?.length > 0) {
          const detail = rs[0];
          if (detail) {
            const isYour =
              detail?.player1?.toLocaleLowerCase() === keySet.address?.toLocaleLowerCase() ||
              detail?.player2?.toLocaleLowerCase() === keySet?.address?.toLocaleLowerCase();
            if (isYour) {
              setActionText('Creating');
            } else {
              setActionText('Joining');
            }
          }
        } else {
          setActionText('Creating');
        }
      } catch (error) {
        // Handle error if any
        console.error('Error fetching action text:', error);
        // Set a default value or handle error case appropriately
        setActionText('Creating');
      }
    };

    fetchActionText(); // Call the async function

    // Pass any dependencies in the array that trigger this effect when changed
  }, [contractSigner, roomInfo, keySet]);

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
            {gameState.gameID && gameState.loading ? 'Waiting for opponent to connect...' : `${actionText} game...`}
          </motion.h5>
          {gameState.loading && <Spinner />}
          {gameState.gameID && playerState.isFinding && (
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
          )}
        </motion.div>
      </GamePopup>
    </AnimatePresence>
  );
});

export default CreateRoom;
