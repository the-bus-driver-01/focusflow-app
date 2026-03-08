import { useCallback, useState } from 'react';

interface UseAPIState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseAPIOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for handling API calls with loading and error states
 */
export const useAPI = <T,>(
  apiCall: () => Promise<T>,
  options?: UseAPIOptions
) => {
  const [state, setState] = useState<UseAPIState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, isLoading: true, error: null });

    try {
      const result = await apiCall();
      setState({ data: result, isLoading: false, error: null });
      options?.onSuccess?.(result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, isLoading: false, error: errorMessage });
      options?.onError?.(error instanceof Error ? error : new Error(errorMessage));
      throw error;
    }
  }, [apiCall, options]);

  return { ...state, execute };
};

export default useAPI;
