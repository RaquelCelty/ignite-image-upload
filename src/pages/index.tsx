import { Button, Box } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';
import { useMemo } from 'react';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface CardProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}
interface ImageProps {
  after: number | null;
  data: CardProps[];
}

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }): Promise<ImageProps> => {
    if (pageParam) {
      const { data } = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });

      return data;
    }

    const { data } = await api.get('/api/images');
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.after,
  });

  const formattedData = useMemo(() => {
    return data?.pages.flatMap(item => item);
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button mt="1rem" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
