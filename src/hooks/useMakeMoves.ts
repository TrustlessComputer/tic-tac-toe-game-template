import useContractSigner from './useContractSigner';
import useGetGames from './useGetGames';
import { Player } from '@/interfaces/useGetGames';
import { INDEX_TO_GEO_MAPPER } from '@/constants/game-geo';
import { GAS_PRICE } from '@/configs';

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
    await contractSigner.makeMove(gameID, geo.x, geo.y, { gasPrice: GAS_PRICE });
    const games = await onWaitingUpdateNextMove({ gameID, myRolePlayer });
    return { games };
  };

  return {
    onMakeMoves,
  };
};

export default useMakeMoves;
