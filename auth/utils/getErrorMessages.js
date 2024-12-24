function getErrorMessages(error) {
  try {
    const errors = {};
    Object.values(error.errors).forEach(
      ({ path, message }) => (errors[path] = message)
    );
    return errors;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = getErrorMessages;
