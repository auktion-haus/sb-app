import styled from "styled-components";



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

  const CardImage = styled.img`
  width: ${size || "100"}%;
  height: ${size || "100"}%;
  object-fit: cover;
`;

  return (
    <CardImage src={`https://noun.pics/${nounId}.jpg` || backupSrc} alt={"current Auction"} />
  );
};
