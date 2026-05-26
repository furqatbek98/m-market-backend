const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Token topilmadi' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(403).json({ success: false, message: 'Token yaroqsiz' });
  }
};

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Token topilmadi' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin huquqi kerak' });
    req.user = decoded;
    next();
  } catch (e) {
    res.status(403).json({ success: false, message: 'Token yaroqsiz' });
  }
};

module.exports = { authenticateUser, authenticateAdmin };