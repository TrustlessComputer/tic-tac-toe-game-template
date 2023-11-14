import React, { useContext, useEffect, useMemo, useState } from 'react';
import * as S from './styled';
import { ButtonCreateRoom } from '@/components/Button/Button.games';
import { GameContext } from '@/contexts/game.context';
import Square from '@/modules/Home/components/Square';
import { IRole } from '@/interfaces/useGetGameSttate';
import Text from '@/components/Text';
import { WalletContext } from '@/contexts/wallet.context';
import { ellipsisCenter } from 'tc-formatter';
import Spinner from '@/components/Spinner';
import { AssetsContext } from '@/contexts/assets.context';
import { API_URL, CDN_URL_ICONS, isProduction } from '@/configs';
// import BannerImage from '@/images/banner.png';
import ButtonLogin from '@/components/ButtonLogin';
import { motion } from 'framer-motion';
import IconSVG from '@/components/IconSVG';
import ButtonEndMatch from '@/components/ButtonEndMatch';
import ButtonCancelFind from '@/components/ButtonCancelFind';
import { Row } from '@/components/Row';
import useContractSigner from '@/hooks/useContractSigner';
import toast from 'react-hot-toast';
import ModalFinding from '../ModalFinding';
import axios from 'axios';

export enum TYPE_OFFER {
  OFFERING,
  ACCEPT,
  CANCEL,
}

const DashBoard = React.memo(() => {
  const { setShowCreateRoom, gameInfo, turn, loading, playerState, loadedPlayerState, counter, setGameInfo } =
    useContext(GameContext);
  const { keySet, walletState } = useContext(WalletContext);
  const { isNeedTopupTC } = useContext(AssetsContext);
  // const [loadingDraw, setLoadingDraw] = useState(false);
  // const [statusOffer, setStatusOffer] = useState<TYPE_OFFER | null>(null);

  // const contractSigner = useContractSigner();
  const [player1, setPlayer1] = useState<any>(null);
  const [player2, setPlayer2] = useState<any>(null);

  const isMyTurn = React.useMemo(() => {
    return turn === gameInfo?.myTurn;
  }, [turn, gameInfo]);

  const turnColor = React.useMemo(() => {
    return {
      myTurn: gameInfo?.myTurn === IRole.X ? '#62fffc' : '#ffa02e',
      yourTurn: gameInfo?.myTurn === IRole.X ? '#ffa02e' : '#62fffc',
    };
  }, [gameInfo]);

  const isWatcher = useMemo(() => {
    if (gameInfo?.infoForWatcher) {
      return true;
    }
    return false;
  }, [gameInfo]);

  // const onOfferDraw = async () => {
  //   setLoadingDraw(true);
  //   if (!contractSigner) return;
  //   const rs = await contractSigner?.offerDraw(gameInfo?.gameID);
  //   console.log('RS offer____ ', rs);
  //   setStatusOffer(TYPE_OFFER.OFFERING);
  //   try {
  //   } catch (error) {
  //     console.log('error offerr');
  //   } finally {
  //     setLoadingDraw(false);
  //   }
  // };

  // const onAcceptDraw = async () => {
  //   setLoadingDraw(true);
  //   if (!contractSigner) return;
  //   const rs = await contractSigner?.acceptDraw(gameInfo?.gameID);
  //   console.log('RS accept____ ', rs);
  //   setGameInfo((value: any) =>
  //     value
  //       ? {
  //           ...value,
  //           winner: '3',
  //         }
  //       : undefined,
  //   );
  //   try {
  //   } catch (error) {
  //     console.log('error offerr');
  //   } finally {
  //     setLoadingDraw(false);
  //   }
  // };

  // const onCancelDraw = async () => {
  //   setLoadingDraw(true);
  //   if (!contractSigner) return;
  //   const rs = await contractSigner?.cancelDraw(gameInfo?.gameID);
  //   setGameInfo((value: any) =>
  //     value
  //       ? {
  //           ...value,
  //           drawOffer: 0,
  //         }
  //       : undefined,
  //   );
  //   console.log('RS cancel offer____ ', rs);
  //   try {
  //   } catch (error) {
  //     console.log('error offerr');
  //   } finally {
  //     setLoadingDraw(false);
  //   }
  // };

  // const onRejectDraw = async () => {
  //   setLoadingDraw(true);
  //   if (!contractSigner) return;
  //   const rs = await contractSigner?.rejectDraw(gameInfo?.gameID);
  //   console.log('RS rejectDraw ____ ', rs);
  //   setGameInfo((value: any) =>
  //     value
  //       ? {
  //           ...value,
  //           drawOffer: 0,
  //         }
  //       : undefined,
  //   );
  //   try {
  //   } catch (error) {
  //     console.log('error offerr');
  //   } finally {
  //     setLoadingDraw(false);
  //   }
  // };

  // useEffect(() => {
  //   if (gameInfo?.winner !== '0') {
  //     setStatusOffer(null);
  //   }
  //   if (contractSigner) {
  //     contractSigner?.on('DrawOffer', async (matchId, playerAddress, tokenAddress, tx) => {
  //       console.log('DrawOffer', matchId, playerAddress);

  //       if (statusOffer === TYPE_OFFER.OFFERING) {
  //         if (playerAddress === gameInfo?.competitorAddress) {
  //           console.log('aaee');
  //           setGameInfo((value: any) =>
  //             value
  //               ? {
  //                   ...value,
  //                   winner: '3',
  //                 }
  //               : undefined,
  //           );
  //         }
  //       }
  //     });

  //     contractSigner?.on('DrawRejection', async (matchId, playerAddress, tokenAddress, tx) => {
  //       console.log('DrawRejection', matchId, playerAddress, tx);
  //       if (statusOffer === TYPE_OFFER.OFFERING) {
  //         if (playerAddress === gameInfo?.competitorAddress) {
  //           console.log('iiaa');
  //           setStatusOffer(null);
  //           toast('Opponents do not accept', {
  //             icon: '🙅🏻',
  //           });
  //         }
  //       }
  //     });
  //   }
  // }, [contractSigner]);

  const renderCounter = () => {
    return (
      <Text color={counter >= 10 ? 'black' : 'txt-error'} fontWeight="semibold" size="24">
        {counter}s
      </Text>
    );
  };

  const renderWarning = () => {
    return (
      isNeedTopupTC && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="warning-wrapper">
          <p style={{ textAlign: 'center' }}>
            <span
              onClick={() =>
                window.open(
                  isProduction
                    ? 'https://newbitcoincity.com/topup?tab=faucet'
                    : 'https://alpha.dev.newbitcoincity.com/topup?tab=faucet',
                )
              }
            >
              Get TC from faucet to play game
            </span>
          </p>
        </motion.div>
      )
    );
  };

  const renderActions = () => {
    if (isNeedTopupTC) return undefined;
    const isFinding = !gameInfo?.gameID && playerState.isFinding;
    const isPlaying = !gameInfo?.gameID && playerState.isPlaying;

    const isDisabled = isFinding || isPlaying || isNeedTopupTC || walletState.isNeedCreate || walletState.isNeedLogin;

    const isShowAction = !isPlaying && !isFinding;

    return (
      <div>
        {isFinding && renderCancelFinding()}
        {isPlaying && renderCancelPlaying()}
        {/* <S.Actions initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
          {isPlaying && <ButtonEndMatch />}
          {isFinding && <ButtonCancelFind />}
          {isShowAction && (
            <ButtonCreateRoom
              leftIcon={<IconSVG src={`${CDN_URL_ICONS}/ic-plus-square.svg`} maxWidth="24px" />}
              disabled={isDisabled}
              onClick={() => {
                setShowCreateRoom(true);
              }}
            >
              Play
            </ButtonCreateRoom>
          )}
        </S.Actions> */}
      </div>
    );
  };

  // const renderDrawOffer = () => {
  //   if (!gameInfo) return;
  //   return (
  //     <>
  //       {loadingDraw && (
  //         <div className="loading-layer">
  //           <Spinner size={24} />
  //         </div>
  //       )}

  //       {((gameInfo?.drawOffer && gameInfo?.drawOffer !== 0 && gameInfo?.winner === '0') ||
  //         statusOffer === TYPE_OFFER.OFFERING) && (
  //         <div className="modal-offer-draw">
  //           {gameInfo?.drawOffer !== Number(gameInfo?.myRolePlayer) && statusOffer == null ? (
  //             <div className="inner">
  //               <p>Your opponent wants a draw</p>
  //               <p>Do you agee?</p>
  //               <div className="footer">
  //                 <button onClick={onAcceptDraw} className="yes">
  //                   Yes
  //                 </button>
  //                 <button onClick={onRejectDraw} className="no">
  //                   No
  //                 </button>
  //               </div>
  //             </div>
  //           ) : (
  //             <div className="inner">
  //               {statusOffer === TYPE_OFFER.OFFERING ? (
  //                 <p>Wait for your opponent accept...</p>
  //               ) : (
  //                 <p>Opponents do not accept</p>
  //               )}

  //               <div className="footer">
  //                 {statusOffer === TYPE_OFFER.OFFERING ? (
  //                   <button onClick={onCancelDraw} className="yes">
  //                     Cancel
  //                   </button>
  //                 ) : (
  //                   <p className="reject">Auto close after 2s</p>
  //                 )}
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       )}
  //       <button className="drawOfferBtn" onClick={onOfferDraw}>
  //         Draw Offer
  //       </button>
  //     </>
  //   );
  // };

  const renderMatch = () => {
    if (!gameInfo) return;
    return (
      <S.MatchContent initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }}>
        <S.PlayerBox isMyTurn={isMyTurn} turnColor={turnColor.myTurn}>
          <Row align="center" gap="24px">
            <div className="square-box">
              <Square ind="1" updateSquares={() => undefined} clsName={gameInfo.myTurn} />
            </div>
            <div>
              <Text fontWeight="semibold" size="24">
                {!gameInfo?.infoForWatcher && <span className="address-highlight">(YOU)</span>}
                {ellipsisCenter({ str: gameInfo?.infoForWatcher?.player1 || keySet.address, limit: 5 })}
              </Text>
              {isMyTurn && (
                <Text fontWeight="medium" size="14" className="moving-now" color="txt-secondary">
                  Moving now...
                </Text>
              )}
            </div>
          </Row>
          {loading && <Spinner size={24} />}
          {isMyTurn && !loading && <div className="wrap-counter">{renderCounter()}</div>}
        </S.PlayerBox>
        <S.PlayerBox isMyTurn={!isMyTurn} turnColor={turnColor.yourTurn}>
          <Row align="center" gap="24px">
            <div className="square-box">
              <Square
                ind="2"
                updateSquares={() => undefined}
                clsName={gameInfo.myTurn === IRole.X ? IRole.O : IRole.X}
              />
            </div>
            <div>
              <Text fontWeight="semibold" size="24">
                {ellipsisCenter({ str: gameInfo?.infoForWatcher?.player2 || gameInfo.competitorAddress, limit: 5 })}
              </Text>
              {!isMyTurn && (
                <Text fontWeight="medium" size="14" className="moving-now" color="txt-secondary">
                  Moving now...
                </Text>
              )}
            </div>
          </Row>
          {!isMyTurn && <div className="wrap-counter">{renderCounter()}</div>}
        </S.PlayerBox>
      </S.MatchContent>
    );
  };

  const renderCancelFinding = () => {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="warning-wrapper">
        <p>Waiting for opponent to connect...</p>
      </motion.div>
    );
  };

  const renderCancelPlaying = () => {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="warning-wrapper">
        <p>You are in a match...</p>
      </motion.div>
    );
  };

  const renderContent = () => {
    if (!walletState.isLogged) return undefined;
    if (!loadedPlayerState)
      return (
        <div className="wrap-spinner">
          <Spinner size={38} />
        </div>
      );
    if (!gameInfo?.gameID) return renderActions();
    return <></>;
    // return renderMatch();
  };

  return (
    <S.Container>
      {gameInfo?.gameID && turn && gameInfo?.winner === '0' && (
        <div className="alert-move">
          <div className="rowFlex">
            <div className={`player ${isMyTurn ? 'active' : ''}`}>
              {/* <span className="tick">
                <Square ind="1" updateSquares={() => undefined} clsName={gameInfo?.myTurn as any} />
              </span> */}
              <span className="avatar">
                <img src={gameInfo?.player1?.avatar} alt="" />
              </span>
              <span className="name">{isWatcher ? gameInfo?.player1?.name : isMyTurn ? 'Your turn' : 'You'}</span>
            </div>
            <div className="time"> {!loading ? renderCounter() : <Spinner size={20} />}</div>
            <div className={`player ${!isMyTurn ? 'active' : ''}`}>
              <span className="name right">
                {/* {ellipsisCenter({ str: gameInfo?.infoForWatcher?.player1 || keySet.address, limit: 5 })} */}
                {/* {player2} */}
                {gameInfo?.player2?.name}
              </span>
              {/* <span className="tick">
                <Square
                  ind="2"
                  updateSquares={() => undefined}
                  clsName={gameInfo?.myTurn === IRole.X ? IRole.O : IRole.X}
                />
              </span> */}
              <span className="avatar">
                <img src={gameInfo?.player2?.avatar} alt="" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* {gameInfo?.gameID &&
        turn &&
        !gameInfo?.infoForWatcher &&
        gameInfo?.winner === '0' &&
        (isMyTurn ? (
          <div className="alert-move">
            <div className="rowFlex">
              <span className="myTurn">Your turn</span>
              {!loading ? renderCounter() : <Spinner size={20} />}
            </div>
          </div>
        ) : (
          <div className="alert-move">
            <div className="rowFlex">
              <span>Wait for your opponent </span>
              {!loading ? renderCounter() : <Spinner size={20} />}
            </div>
          </div>
        ))} */}
      {/* <S.Banner src={BannerImage} /> */}
      {playerState?.isFinding && <ModalFinding />}
      {/* {gameInfo?.gameID && renderMatch()} */}
      {/* {renderDrawOffer()} */}
      {/* {!playerState?.isPlaying && (
        <S.Box>
          <ButtonLogin />
          {renderWarning()}
          {renderContent()}
        </S.Box>
      )} */}
      {/* {playerState?.isFinding && !gameInfo?.gameID && <S.Box>{renderContent()}</S.Box>} */}
    </S.Container>
  );
});

export default DashBoard;
