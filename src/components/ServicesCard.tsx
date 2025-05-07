import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Typography from './Typography';

type Props = {
  title: string;
  subtitle: string;
  imageUrl: string;
  isCareer?: boolean;
  showLearnMore?: boolean;
  isFeature?: boolean;
  slug?: string;
};

const Container = styled.div<{ $isCareer?: boolean; $isFeature?: boolean }>`
  width: ${({ $isFeature }) => ($isFeature ? '270px' : '368px')};
  min-height: 250px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 24px;
  background-color: white;
  border: 2px solid #e0e0e0;
  cursor: pointer;

  &:hover {
    background-color: #dadada;
  }

  @media (max-width: 1280px) {
    max-width: 100%;
    width: 100%;
    gap: 12px;
    padding: ${({ $isFeature }) => ($isFeature ? '24px' : '16px')};
    min-height: ${({ $isCareer }) => ($isCareer ? '187px' : 'auto')};
  }
`;

const StyledTypography = styled(Typography)<{ $isFeature?: boolean }>`
  color: #031716;
  @media (max-width: 1280px) {
    ${({ $isFeature }) =>
      $isFeature &&
      `
      font-size: 20px;
    `}
  }
`;

const SubtitleTypography = styled(Typography)<{ $isFeature?: boolean }>`
  color: #03171680;
  white-space: pre-line;
  max-width: 309px;

  @media (max-width: 1280px) {
    ${({ $isFeature }) =>
      $isFeature &&
      `
      font-size: 14px;
    `}
  }
`;

const LearnMore = styled(Typography)<{ $isFeature?: boolean }>`
  color: #031716;
  text-decoration: underline;
  font-size: 14px;

  @media (max-width: 1280px) {
    ${({ $isFeature }) =>
      $isFeature &&
      `
      font-size: 16px;
    `}
  }
`;

const ServicesCard = ({
  title,
  subtitle,
  imageUrl,
  isCareer,
  showLearnMore,
  isFeature,
  slug,
}: Props) => {
  const content = (
    <>
      <Image src={imageUrl} alt={`${title} image`} width={64} height={64} />
      <StyledTypography $isFeature={isFeature} variant="h3">
        {title}
      </StyledTypography>
      <SubtitleTypography $isFeature={isFeature} variant="paragraph-medium">
        {subtitle}
      </SubtitleTypography>
      {showLearnMore && (
        <LearnMore $isFeature={isFeature} variant="paragraph-bold">
          Learn more
        </LearnMore>
      )}
    </>
  );

  if (slug && !isCareer) {
    return (
      <Link href={`/services/${slug}`} style={{ textDecoration: 'none' }}>
        <Container $isCareer={isCareer} $isFeature={isFeature}>
          {content}
        </Container>
      </Link>
    );
  }

  return (
    <Container $isCareer={isCareer} $isFeature={isFeature}>
      {content}
    </Container>
  );
};

export default ServicesCard;
