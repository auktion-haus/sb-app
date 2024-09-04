import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

interface CardProps {
  $bgcolor: string;
}

interface FlipCardProps {
  $isflipped: boolean;
}

const GridItem = styled.div`
  perspective: 1000px;
  height: 50vh;
`;

const FlippableCardWrapper = styled.div<FlipCardProps>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ $isflipped }) => ($isflipped ? 'rotateY(180deg)' : 'none')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const CardFront = styled(CardFace) <CardProps>`
  display: flex;
  background-color: ${({ $bgcolor }) => $bgcolor};
  width: 100%;
  height: 100%;
`;

const FrontComponentLeftWrapper = styled.div`
margin: 1rem;
flex-basis:30%;
`
const FrontComponentRightWrapper = styled.div`
flex-basis:70%;
`

const CardBack = styled(CardFace)`
  background-color: #36454F; 
  transform: rotateY(180deg);
`;

const FlipButton = styled.button`
  position: absolute;
  top: 10px;
  right: 2px;
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid black;
  transform: rotate(45deg);

`;

interface FlippableCardProps {
  frontComponentLeft: React.ComponentType;
  frontComponentRight: React.ComponentType;
  backComponent: React.ComponentType;
  backgroundColor?: string;
}

export const FlippableCard: React.FC<FlippableCardProps> = React.memo(
  ({ frontComponentLeft: FrontComponentLeft, frontComponentRight: FrontComponentRight, backComponent: BackComponent, backgroundColor: bg }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = useCallback(() => {
      setIsFlipped(prevState => !prevState);
    }, []);

    const memoizedBgColor = useMemo(() => bg, [bg]);

    return (
      <GridItem>
        <FlippableCardWrapper $isflipped={isFlipped}>
          <CardFront $bgcolor={memoizedBgColor || 'transparent'}>
            <FrontComponentLeftWrapper>
              <FrontComponentLeft />
            </FrontComponentLeftWrapper>
            <FrontComponentRightWrapper>
              <FrontComponentRight />
            </FrontComponentRightWrapper>
          </CardFront>
          <CardBack>
            <BackComponent />
          </CardBack>
        </FlippableCardWrapper>
        <FlipButton onClick={handleFlip}><Triangle /></FlipButton>

      </GridItem>
    );
  }
);