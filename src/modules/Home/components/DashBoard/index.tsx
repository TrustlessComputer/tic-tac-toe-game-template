import React, { useContext } from 'react';
import * as S from './styled';
import { ButtonCreateRoom, ButtonJoinRoom } from '@/components/Button/Button.games';
import { GameContext } from '@/contexts/game.context';
import Square from '@/modules/Home/components/Square';
import { IRole } from '@/interfaces/useGetGameSttate';
import Text from '@/components/Text';
import { WalletContext } from '@/contexts/wallet.context';
import { ellipsisCenter } from 'tc-formatter';
import Spinner from '@/components/Spinner';
import toast from 'react-hot-toast';
import * as formatter from 'tc-formatter';
import { AssetsContext } from '@/contexts/assets.context';
import { MIN_AMOUNT } from '@/configs';

const DashBoard = React.memo(() => {
  const { setShowCreateRoom, setShowJoinRoom, gameInfo, turn, loading } = useContext(GameContext);
  const { keySet, walletState } = useContext(WalletContext);
  const { isNeedTopupTC } = useContext(AssetsContext);

  const isMyTurn = React.useMemo(() => {
    return turn === gameInfo?.myTurn;
  }, [turn, gameInfo]);

  const turnColor = React.useMemo(() => {
    return {
      myTurn: gameInfo?.myTurn === IRole.X ? '#62fffc' : '#ffa02e',
      yourTurn: gameInfo?.myTurn === IRole.X ? '#ffa02e' : '#62fffc',
    };
  }, [gameInfo]);

  const renderContent = () => {
    if (!gameInfo?.gameID) {
      return (
        <div>
          {isNeedTopupTC && (
            <div className="warning-wrapper">
              <p>
                Please deposit at least{' '}
                {formatter.formatAmount({
                  originalAmount: MIN_AMOUNT,
                  decimals: 18,
                })}{' '}
                TC to play the game.
              </p>
            </div>
          )}
          <S.Actions>
            <ButtonCreateRoom
              onClick={() => {
                if (walletState.isNeedCreate || walletState.isNeedLogin) return toast.error('Please login');
                setShowCreateRoom(true);
              }}
            />
            <ButtonJoinRoom
              onClick={() => {
                if (walletState.isNeedCreate || walletState.isNeedLogin) return toast.error('Please login');
                setShowJoinRoom(true);
              }}
            />
          </S.Actions>
        </div>
      );
    }

    return (
      <S.MatchContent>
        <S.PlayerBox isMyTurn={isMyTurn} turnColor={turnColor.myTurn}>
          <div className="square-box">
            <Square ind="1" updateSquares={() => undefined} clsName={gameInfo.myTurn} />
          </div>
          <div>
            <Text fontWeight="semibold" size="24">
              <span className="address-highlight">(YOU)</span>
              {ellipsisCenter({ str: keySet.address, limit: 5 })}
            </Text>
            {isMyTurn && (
              <Text fontWeight="medium" size="14" className="moving-now" color="txt-secondary">
                Moving now...
              </Text>
            )}
          </div>
          {loading && <Spinner size={24} />}
        </S.PlayerBox>
        <S.PlayerBox isMyTurn={!isMyTurn} turnColor={turnColor.yourTurn}>
          <div className="square-box">
            <Square ind="2" updateSquares={() => undefined} clsName={gameInfo.myTurn === IRole.X ? IRole.O : IRole.X} />
          </div>
          <div>
            <Text fontWeight="semibold" size="24">
              {ellipsisCenter({ str: gameInfo.competitorAddress, limit: 5 })}
            </Text>
            {!isMyTurn && (
              <Text fontWeight="medium" size="14" className="moving-now" color="txt-secondary">
                Moving now...
              </Text>
            )}
          </div>
        </S.PlayerBox>
      </S.MatchContent>
    );
  };

  return <S.Container>{renderContent()}</S.Container>;
});

export default DashBoard;
