import { StyledEmpty } from './Empty.styled';
import { CDN_URL_ICONS } from '@/configs';
import Text from '@/components/Text';

export type TEmpty = {
  infoText?: string;
  link?: string;
  isTable?: boolean;
};

const Empty = ({ infoText = '', link = '', isTable = false }: TEmpty) => {
  return (
    <StyledEmpty className="notFound" isTable={isTable}>
      <img width={110} height={110} src={`${CDN_URL_ICONS}/ic-empty.svg`} alt="Not found item" className="image" />
      <Text className="mt-32" fontWeight="semibold" size="36">
        {infoText}
      </Text>
      {link && (
        <Text className="mt-12 link" fontWeight="semibold" size="16">
          <a href={link} target="_blank">
            Learn more
          </a>
        </Text>
      )}
    </StyledEmpty>
  );
};

export default Empty;
