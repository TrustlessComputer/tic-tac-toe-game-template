import useContractSigner from './useContractSigner';
import useGetGames from './useGetGames';
import { Player } from '@/interfaces/useGetGames';
import { INDEX_TO_GEO_MAPPER } from '@/constants/game-geo';

const useMakeMoves = () => {
  const contractSigner = useContractSigner();
  const { onWaitingUpdateNextMove } = useGetGames();

  const onMakeMoves = async ({
    gameID,
    moveIdx,
    myRolePlayer,
  }: {
    gameID: string;
    moveIdx: string | number;
    myRolePlayer: Player;
  }) => {
    console.log('aacc___', gameID, moveIdx, myRolePlayer);

    if (!contractSigner) return;
    const geo = (INDEX_TO_GEO_MAPPER as any)[Number(moveIdx) as any];
    const winner = await contractSigner.calculateWinner(gameID, geo.x, geo.y);
    console.log('111');
    // const gasLimit = contractSigner.estimateGas.makeMove(gameID, geo.x, geo.y, winner.toString() !== '0');
    await contractSigner.makeMove(gameID, geo.x, geo.y, winner.toString() !== '0');
    console.log('222');
    const games = await onWaitingUpdateNextMove({ gameID, myRolePlayer });
    console.log('333');
    return { games };
  };

  return {
    onMakeMoves,
  };
};

export default useMakeMoves;
