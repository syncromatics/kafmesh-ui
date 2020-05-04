import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const dummyData = gql`
  {
    services {
      name
    }
  }
`;

function Elements() {
  const { loading, error, data } = useQuery(dummyData);
  const elements = {
    data:
      data &&
      data.services.map(item => ({
        data: {
          ...item,
          id: item.name,
        },
      })),
    loading,
    error,
  };

  return elements;
}

export default Elements;
