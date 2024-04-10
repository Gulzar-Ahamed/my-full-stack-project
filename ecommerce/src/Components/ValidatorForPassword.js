export const validatePassword = (_, value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    if (!regex.test(value)) {
      return Promise.reject(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(except underscore _)'
      );
    }
    return Promise.resolve();
  };

