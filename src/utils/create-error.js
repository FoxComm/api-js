export default function createError(err) {
  const error = new Error(err.message || String(err));
  error.response = err.response;
  error.responseJson = err.response ? err.response.body : err;
  error.status = err.response ? err.response.statusCode : err.status || err.statusCode;

  return error;
}
