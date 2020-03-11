import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const dummyData = gql`
  {
    datas {
      parent
      description
      shape
      source
      target
      label
      name
    }
  }
`;

function Elements() {
  const { loading, error, data } = useQuery(dummyData);
  const elements = {
    data:
      data &&
      data.datas.map(item => ({
        data: {
          ...item,
          id: item.name,
          shape: item.shape && item.shape.toLowerCase(),
        },
      })),
    loading,
    error,
  };

  return elements;
}

export default Elements;
