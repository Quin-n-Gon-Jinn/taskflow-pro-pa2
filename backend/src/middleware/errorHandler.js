export const errorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;

  res.status(status).json({
    message: error.message || 'Ocurrió un error interno en el servidor.',
    status
  });
};
