import { GAS_PRICE } from '@/configs';
import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';
import React, { useContext } from 'react';
import { GameContext } from '@/contexts/game.context';
import useContractSigner from '@/hooks/useContractSigner';
import useProvider from '@/hooks/useProvider';
import useGetGames from '@/hooks/useGetGames';

const useFindMatch = () => {
  const [gameState, setGameState] = React.useState({
    loading: false,
    gameID: undefined,
  });
  const contractSigner = useContractSigner();
  const provider = useProvider();
  const { onWaitingGames } = useGetGames();

  const { onJoinRoom } = useContext(GameContext);

  const onFindMatch = async () => {
    if (!contractSigner || !provider) return;
    try {
      setGameState(value => ({ ...value, loading: true }));
      const tx = await contractSigner.findMatch({ gasPrice: GAS_PRICE });
      await tx.wait();
      const hash = Object(tx).hash;
      const receipt = await provider.getTransactionReceipt(hash);
      const logs = receipt?.logs;
      if (logs && !!logs.length && logs[0]?.topics.length > 1) {
        const logData = logs[0];
        const gameID = logData.topics[1] as any;
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

  return {
    onFindMatch,
    gameState,
  };
};

export default useFindMatch;
