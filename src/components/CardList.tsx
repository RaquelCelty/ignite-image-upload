import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [image, setImage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleViewImage(url: string): void {
    setImage(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} columnGap="40px" rowGap="40px">
        {cards.map(card => {
          return <Card key={card.id} data={card} viewImage={handleViewImage} />;
        })}
      </SimpleGrid>

      <ModalViewImage imgUrl={image} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
