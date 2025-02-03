const getErrorMessage = (error: any): string => {
  if (error && typeof error === 'object' && 'data' in error) {
    const { data } = error;

    if (typeof data === 'object' && data !== null && 'message' in data) {
      return (data as { message: string }).message;
    }
  }

  return 'An unknown error occurred';
};

export default getErrorMessage;
