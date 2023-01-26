import { useState } from 'react';

export default function useFetchMeal() {
  const [dados, setDados] = useState([]);
  const [errors, setErrors] = useState(null);

  const fetchApi = async (link) => {
    try {
      const data = await fetch(`${link}`);
      const json = await data.json();
      console.log(json);
      setDados(json);
    } catch (error) {
      setErrors(error);
    }
  };

  return { dados, errors, fetchApi };
}
