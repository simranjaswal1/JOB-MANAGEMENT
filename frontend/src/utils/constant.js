const isLocalhost = window.location.hostname === 'localhost';

const BASE_API_URL = isLocalhost
  ? 'http://localhost:8000/api/v1'
  : 'https://job-management-1yq7.onrender.com/api/v1';

export const USER_API_END_POINT = `${BASE_API_URL}/user`;
export const JOB_API_END_POINT = `${BASE_API_URL}/job`;
export const APPLICATION_API_END_POINT = `${BASE_API_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_API_URL}/company`;
