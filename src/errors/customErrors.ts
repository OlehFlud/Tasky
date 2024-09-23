export const CustomErrors = {
  //400
  BAD_REQUEST_USER_PRESENT: {
    message: 'User is already registered',
    code: 4001,
  },
  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not present',
  },
  NOT_FOUND: {
    message: 'Record not found',
  },
  TASK_IN_PROJECT_NOT_FOUND: {
    message: 'Record in project is not found',
  },
  USER_IN_PROJECT_PRESENT: {
    message: 'User in project is already exist',
  },
  BAD_REQUEST_USER_ALREADY_ACTIVATED: {
    message: 'User is already activated',
    code: 4002,
  },
};
