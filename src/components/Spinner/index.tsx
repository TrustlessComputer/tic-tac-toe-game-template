import { Container } from '@/components/Spinner/styled';

interface IProps {
  className?: string;
  size?: number;
}

const Spinner = ({ className, size = 45 }: IProps) => <Container className={className} size={size} />;

export default Spinner;
