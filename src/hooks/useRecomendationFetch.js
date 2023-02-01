import { useState } from 'react';

export default function useRecomendationFetch() {
  const [dataRecomendation, setDataRecomendation] = useState([]);
  const [dataErrors, setDataErrors] = useState(null);

  const fetchRecomendationApi = async (link) => {
    try {
      const data = await fetch(`${link}`);
      const json = await data.json();
      setDataRecomendation(json);
    } catch (error) {
      setDataErrors(error);
    }
  };

  return { dataRecomendation, dataErrors, fetchRecomendationApi };
}
