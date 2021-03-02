import axios from 'axios';

export const getTemplates = async () => {
  const { data } = await axios.get('/templates');
  return data;
};

export const getEmails = async () => {
  const { data } = await axios.get('/emails');
  return data;
};

export const createEmail = async (data) => {
  await axios.post('/emails', data);
  return true;
};