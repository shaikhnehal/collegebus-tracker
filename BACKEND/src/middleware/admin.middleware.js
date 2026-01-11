const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
  next();
};

module.exports = { adminOnly };
