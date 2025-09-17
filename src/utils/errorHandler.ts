// Define error interfaces
interface ValidationError extends Error {
  name: 'ValidationError';
  message: string;
}

interface MongoError extends Error {
  name: 'MongoError';
  code: number;
  keyValue?: Record<string, string>;
}

type ErrorResponse = {
  message: string;
  status: number;
};

/**
 * Handles API errors and returns a standardized error response
 * @param err The error to handle
 * @returns An object containing the error message and status code
 */
export function handleApiError(err: Error): ErrorResponse {
  console.error(err);

  if (err.name === 'ValidationError') {
    return {
      message: `Validation error: ${(err as ValidationError).message}`,
      status: 400
    };
  } else if (err.name === 'MongoError' && (err as MongoError).code === 11000) {
    return {
      message: `Duplicate key error: ${JSON.stringify((err as MongoError).keyValue)}`,
      status: 400
    };
  } else {
    return {
      message: "An unexpected error occurred",
      status: 500
    };
  }
}