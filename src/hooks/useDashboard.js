import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useDashboard = (isLoggedIn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const response = await api.get('/dashboard/summary');
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard summary:', err);
      setError(err.response?.data?.error || 'Error al cargar el dashboard');
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { data, setData, loading, error, refetch: fetchSummary };
};
