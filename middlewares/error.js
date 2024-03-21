class errorhandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

const error = (err, req, res, next) => {
  err.message = err.message || "Internal Server error";
  err.statuscode = err.statuscode || 500;

  console.log(err.message);
  return res
    .status(err.statuscode)
    .json({ success: "true", message: err.message });
};

module.exports = { error, errorhandler };
