import styled from "styled-components";

interface CardImageProps {
  size?: string;
}

const CardImage = styled.img<CardImageProps>`
  width: ${(props) => props.size || "100"}%;
  height: ${(props) => props.size || "100"}%;
  object-fit: cover;
`;


export const NounsImage = ({
  nounId,
  backupSrc,
  size

}: {
  nounId: string;
  backupSrc?: string;
  size?: string;
}) => {


  if (!nounId) {
    return;
  }


  return (
    <CardImage size={size} src={`https://noun.pics/${nounId}.jpg` || backupSrc} alt={"current Auction"} />
  );
};
