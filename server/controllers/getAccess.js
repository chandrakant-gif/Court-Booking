const getAccess = (req, res, next) => {
  res.status(200).json({ message: 'Access granted', status: true });
}
export default getAccess;