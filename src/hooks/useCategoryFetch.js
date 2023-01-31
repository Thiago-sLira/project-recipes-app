import { useState } from 'react';

export default function useCategoryFetch() {
  const [dataCategory, setDataCategory] = useState([]);
  const [erro, setErro] = useState(null);

  const fetchCategoriesApi = async (link) => {
    try {
      const data = await fetch(`${link}`);
      const json = await data.json();
      setDataCategory(json);
    } catch (error) {
      setErro(error);
    }
  };

  return { dataCategory, erro, fetchCategoriesApi, setDataCategory };
}
