import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useFeed = (isLoggedIn) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeed = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching feed:', err);
      setError('Error al cargar el feed');
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const createPost = async (content) => {
    try {
      const response = await api.post('/posts', { content });
      setPosts(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || 'Error al crear la publicación';
    }
  };

  const toggleLike = async (postId) => {
    try {
      const response = await api.post(`/posts/${postId}/like`);
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            isLiked: response.data.liked,
            likesCount: response.data.liked ? p.likesCount + 1 : p.likesCount - 1
          };
        }
        return p;
      }));
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const addComment = async (postId, content) => {
    try {
      const response = await api.post(`/posts/${postId}/comment`, { content });
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...(p.comments || []), response.data],
            commentsCount: p.commentsCount + 1
          };
        }
        return p;
      }));
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || 'Error al añadir comentario';
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return { posts, loading, error, refresh: fetchFeed, createPost, toggleLike, addComment };
};
