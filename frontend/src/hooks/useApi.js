import { useEffect, useState } from "react";

export function useApi(loader) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    loader()
      .then(value => active && setData(value))
      .catch(err => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return { data, loading, error };
}
