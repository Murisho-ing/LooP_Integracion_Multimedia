import api from '../services/api';

export const useActions = (refetchDashboard) => {
  const toggleTask = async (taskId, xp) => {
    try {
      const response = await api.post('/actions/toggle-task', { taskId, xp });
      if (refetchDashboard) refetchDashboard();
      return response.data;
    } catch (err) {
      console.error('Error toggling task:', err);
      throw err;
    }
  };

  const logManualAction = async (categoryName, description, xp) => {
    try {
      const response = await api.post('/actions/log-manual', { categoryName, description, xp });
      if (refetchDashboard) refetchDashboard();
      return response.data;
    } catch (err) {
      console.error('Error logging manual action:', err);
      throw err;
    }
  };

  return { toggleTask, logManualAction };
};
