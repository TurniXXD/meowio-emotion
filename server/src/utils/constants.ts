export const swagger = {
  apiResponses: {
    requiredBodyParams: {
      status: 400,
      description: 'Required body params missing',
      content: {
        'application/json': {
          example: {
            code: 'REQUIRED_PARAMS_MISSING',
            message: 'Required body params missing',
          },
        },
      },
    },
    unathorized: { status: 401, description: 'Unauthorized' },
    forbidden: { status: 403, description: 'Forbidden' },
  },
};

export const customHeaders = {
  xApiKey: 'x-api-key',
};
