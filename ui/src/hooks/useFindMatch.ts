// import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';
import React, { useContext } from 'react';
import { GameContext } from '@/contexts/game.context';
import useContractSigner from '@/hooks/useContractSigner';
import useProvider from '@/hooks/useProvider';
import useGetGames from '@/hooks/useGetGames';
import { ethers } from 'ethers';
import useContractERC20 from './useContractERC20';
import { CONTRACT_ADDRESS, PARENT_PATH, PARENT_PATH_V2 } from '@/configs';
import { getErrorMessage } from '@/utils/error';
import { WalletContext } from '@/contexts/wallet.context';

// const hardValue = '0.000001';

const useFindMatch = () => {
  const [gameState, setGameState] = React.useState({
    loading: false,
    gameID: undefined,
  });
  const contractSigner = useContractSigner();
  const contractErc20Signer = useContractERC20();
  const { keySet } = useContext(WalletContext);

  const provider = useProvider();
  const { onWaitingGames } = useGetGames();

  const { onJoinRoom, setShowCreateRoom, roomInfo } = useContext(GameContext);

  const checkMyPending = async () => {
    try {
      const pendingDetails = await contractSigner?.getAlphaPendingMatches(roomInfo?.roomId);
      const pendingIds = await contractSigner?.getAlphaPendingMatchIds(roomInfo?.roomId);
      const index = pendingDetails.findIndex((item: any) => {
        if (
          item?.player1?.toLocaleLowerCase() === keySet?.address?.toLocaleLowerCase() ||
          item?.player2?.toLocaleLowerCase() === keySet?.address?.toLocaleLowerCase()
        ) {
          return item;
        }
      });
      console.log('index:  __', index);
      if (index >= 0) {
        const hexString = '0x' + Number(pendingIds[index]).toString(16).padStart(64, '0');
        return hexString;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const onFindMatch = async () => {
    if (!contractSigner || !provider || !contractErc20Signer || !roomInfo) return;
    try {
      setGameState(value => ({ ...value, loading: true }));

      const myPendingId: any = await checkMyPending();
      console.log('myPendingId__', myPendingId);
      if (myPendingId) {
        setGameState(value => ({ ...value, gameID: myPendingId }));
        const games = await onWaitingGames(myPendingId);
        if (games) {
          onJoinRoom({
            games,
            myPendingId,
          } as any);
        }
        return;
      }

      const rs: any = await contractErc20Signer.approve(CONTRACT_ADDRESS, ethers.utils.parseEther(roomInfo?.reward));

      console.log('Rs Approve: ', rs, contractErc20Signer);

      // Calculate Gas
      // const methodParams = ['0x427CdB1BbC75a540997082D1D05aAa9064d8de16', ethers.utils.parseEther(hardValue)];
      // const gasEstimate = await contractSigner.estimateGas['findMatch'](...methodParams);

      // const gasEstimateNumber = gasEstimate.toNumber();
      // const gasWithMarkup = Math.ceil(gasEstimateNumber * 1.2);
      // const gasPrice = ethers.utils.parseUnits('1.0', 'gwei');
      // const gasLimit = gasEstimate.toString();

      // console.log('Gas Price__', Number(gasPrice));
      // console.log('Gas Limit', gasLimit);
      // console.log('gasWithMarkup__', gasWithMarkup);
      // End cal

      const tx = await contractSigner.findMatch(roomInfo?.roomId, ethers.utils.parseEther(roomInfo?.reward), {
        gasLimit: '700000',
      });
      console.log('TX before: ', tx);
      // const tx = await contractSigner.findMatch({ gasLimit: '500000' });
      await tx.wait();

      const hash = Object(tx).hash;
      const receipt = await provider.getTransactionReceipt(hash);
      console.log('receipt___', receipt);
      const logs = receipt?.logs;

      if (logs && !!logs.length && logs[0]?.topics.length > 1) {
        const logData = logs[2];
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
      // toast.error(desc);
      toast.error('Someone has joined before or transaction find match failed!');
      setTimeout(() => {
        window.top?.postMessage({ tokenRoom: roomInfo?.roomId, status: 'CLOSE' }, '*');
      }, 3000);
      setTimeout(() => {
        setShowCreateRoom(false);
      }, 2000);
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
