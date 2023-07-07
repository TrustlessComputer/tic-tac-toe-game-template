import React, { useContext } from 'react';
import useGetGames from '@/hooks/useGetGames';
import useProvider from '@/hooks/useProvider';
import useContractSigner from '@/hooks/useContractSigner';
import debounce from 'lodash/debounce';
import { ethers } from 'ethers';
import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import { GamePopup } from '@/modules/styled';
import { GameContext } from '@/contexts/game.context';
import { GAS_PRICE } from '@/configs';

const CreateRoom = React.memo(() => {
  const { onJoinRoom, resetGame } = useContext(GameContext);
  const [gameState, setGameState] = React.useState({
    loading: false,
    gameID: undefined,
  });

  const contractSigner = useContractSigner();
  const provider = useProvider();

  const { onWaitingGames } = useGetGames();

  const onCreateGameID = async () => {
    if (!contractSigner || !provider) return;
    try {
      setGameState(value => ({ ...value, loading: true }));
      const tx = await contractSigner.newGame({ gasPrice: GAS_PRICE });
      await tx.wait();
      const hash = Object(tx).hash;
      const receipt = await provider.getTransactionReceipt(hash);

      // const receipt = await provider.getTransactionReceipt('0xe3abe905a773fc0f695fdc41e06dee36b07fcb37ff517f9ac88ba8efab2f9a4e')
      const logs = receipt?.logs;
      if (logs && logs.length > 1) {
        const logData = logs[0];
        const abiCoder = ethers.AbiCoder.defaultAbiCoder();
        const funcType = [
          {
            name: 'gameId',
            type: 'uint256',
          },
          {
            name: 'creator',
            type: 'address',
          },
        ] as any;
        const game = abiCoder.decode(funcType, logData.data);
        const gameID = game[0].toString();
        setGameState(value => ({ ...value, gameID }));
        const games = await onWaitingGames(gameID);
        if (games) {
          onJoinRoom({
            games,
            gameID,
          });
        }
      }
    } catch (error) {
      console.log('LOGGER--- create game error: ', error);
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    } finally {
      setGameState(value => ({ ...value, loading: false }));
    }
  };

  const debounceCreateGameID = React.useCallback(debounce(onCreateGameID, 1000), []);

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
          {!!gameState.gameID && (
            <motion.h3
              initial={{ scale: 0, y: 100 }}
              animate={{
                scale: 1,
                y: 0,
                transition: {
                  y: { delay: 0.7 },
                  duration: 0.7,
                },
              }}
              style={{ color: 'white' }}
            >
              Game ID: {gameState.gameID}
            </motion.h3>
          )}
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
