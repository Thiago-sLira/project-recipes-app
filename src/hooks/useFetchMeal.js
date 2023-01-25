import { useState } from 'react';

export default function useFetch() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const data = await fetch('https://swapi.dev/api/planets');
      const json = await data.json();
      const { results } = json;
      const mapDel = results.map((obj) => {
        if (obj.residents) {
          delete obj.residents;
        }
        return obj;
      });
      setDados(mapDel);
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return { dados, loading, errors, fetchApi };
}

