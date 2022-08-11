import {GET_JWT, GET_USER_PROFILE, USER_LOGOUT, UPDATE_USER_PROFILE} from './constants'


export function getUserProfile(user) {
  return {
    type: GET_USER_PROFILE,
    payload: user,
  };
}

export function getJwt(jwt) {
  return {
    type: GET_JWT,
    payload: jwt,
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
    payload: {},
  };
}
export function updateUserProfile(user) {
  return {
    type: UPDATE_USER_PROFILE,
    payload: user,
  };
}
