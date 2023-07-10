import styled from 'styled-components';
import Spinner from '@/components/Spinner';

const Container = styled.div<{ opacity: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper {
    width: 250px;
    height: 80px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.3);
  }
`;

const LoadingContainer = ({ loaded, opacity = 60 }: { loaded: boolean; opacity?: number }) => {
  if (loaded) return null;

  return (
    <Container opacity={opacity}>
      <div className="wrapper">
        <Spinner />
      </div>
    </Container>
  );
};

export default LoadingContainer;
