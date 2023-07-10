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
    if (!contractSigner) return;
    const geo = (INDEX_TO_GEO_MAPPER as any)[Number(moveIdx) as any];
    const winner = await contractSigner.calculateWinner(gameID, geo.x, geo.y);
    await contractSigner.makeMove(gameID, geo.x, geo.y, winner.toString() !== '0');
    const games = await onWaitingUpdateNextMove({ gameID, myRolePlayer });
    return { games };
  };

  return {
    onMakeMoves,
  };
};

export default useMakeMoves;
