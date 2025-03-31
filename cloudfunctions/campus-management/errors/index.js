
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.code = 400;
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
    this.code = 500;
  }
}

module.exports = {
  ValidationError,
  DatabaseError
};
  