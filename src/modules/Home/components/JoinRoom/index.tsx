import React, { useContext } from 'react';
import useGetGames from '@/hooks/useGetGames';
import useContractSigner from '@/hooks/useContractSigner';
import SDKError, { ERROR_CODE, getErrorMessage } from '@/utils/error';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '@/components/Spinner';
import { GamePopup } from '@/modules/styled';
import { GameContext } from '@/contexts/game.context';
import { WalletContext } from '@/contexts/wallet.context';
import throttle from 'lodash/throttle';
import Button from '@/components/Button';
import toast from 'react-hot-toast';
import { GAS_PRICE } from '@/configs';
import { ZeroAddress } from 'ethers';

const JoinRoom = React.memo(() => {
  const [gameID, setGameID] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const contractSigner = useContractSigner();
  const { onWaitingGames, onGetGameMapper } = useGetGames();
  const { keySet } = useContext(WalletContext);
  const { onJoinRoom, resetGame } = useContext(GameContext);

  const handleJoinRoom = async () => {
    if (!keySet.address || !contractSigner || !gameID) return;
    try {
      setLoading(true);
      const gameMapper = await onGetGameMapper(gameID);
      if (gameMapper?.player2 !== ZeroAddress || gameMapper?.player1 === ZeroAddress) {
        throw new SDKError(ERROR_CODE.JOIN_GAME_ERROR);
      }
      const tx = await contractSigner.joinGame(gameID, { gasPrice: GAS_PRICE });
      await tx.wait();
      const games = await onWaitingGames(gameID);
      if (
        games &&
        (games.player1.toLowerCase() === keySet.address.toLowerCase() ||
          games.player2.toLowerCase() === keySet.address.toLowerCase())
      ) {
        onJoinRoom({
          games,
          gameID,
        });
      } else {
        throw new SDKError(ERROR_CODE.JOIN_GAME_ERROR);
      }
    } catch (error) {
      console.log('LOGGER--- JOIN GAME ERROR: ', error);
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    } finally {
      setLoading(false);
    }
  };

  const throttleJoinRoom = throttle(handleJoinRoom, 500);

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
            Room ID
          </motion.h2>
          <motion.input
            initial={{ scale: 0 }}
            className="input-room"
            animate={{
              scale: 1,
              transition: {
                delay: 1.3,
                duration: 0.2,
              },
            }}
            placeholder="Input your friend's room id"
            autoFocus={true}
            onChange={event => {
              if (event?.target?.value) {
                setGameID(event?.target.value);
              }
            }}
          />
          {loading && <Spinner />}
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
            <Button className="button" onClick={throttleJoinRoom} disabled={loading}>
              Search
            </Button>
          </motion.div>
        </motion.div>
      </GamePopup>
    </AnimatePresence>
  );
});

export default JoinRoom;
