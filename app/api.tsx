const host = `http://localhost:4000/`;

const api = {
  pre: `Hey! I'd love to hear from you—send me an anonymous message using this link. Don’t worry, I won’t know it’s you. 😊`,
  share: `http://localhost:3000/send/`,
  connect: {
    login: `${host}user/login`,
    signup: `${host}user/signup`,
    logout: `${host}user/logout`,
  },
  send: {
    message: `${host}send/`,
  },
  user: {
    verify: `${host}user/verify/`,
    messages: `${host}send/`,
  },
};

export default api;