const getErrorMessage = (error: any): string => {
  if ('data' in error) {
    if (
      typeof error.data === 'object' &&
      error.data !== null &&
      'message' in error.data
    ) {
      return (error.data as { message: string }).message;
    }
  }
  return 'An unknown error occurred';
};

export default getErrorMessage;
