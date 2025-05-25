const adminRoutes = () => {
  const base = '/admin';

  return {
    base,
    dashboard: `${base}/dashboard`,
    review: `${base}/reviews`,
    idea: `${base}/idea`,
    user: `${base}/users`,
  };
};

const ideaRoutes = (base: string) => {
  const ideaBase = `${base}/ideas`;

  return {
    base: ideaBase,
    create: `${ideaBase}/create`,
    detail: `${ideaBase}/[ideaCode]`,
  };
};

const userRoutes = () => {
  const base = '/user';

  return {
    base,
    ideas: ideaRoutes(base),
    profile: `${base}/profile`,
    changePassword: `${base}/change-password`,
  };
};

const linkTo = {
  home: '/',
  admin: adminRoutes(),
  login: '/login',
  register: '/register',
  flower: '/flower',
  feed: '/feed',
  chat: '/chat',
  refreshToken: '/refresh-token',
  logout: '/logout',
  user: userRoutes(),
  forgotPassword: '/forgot-password',
};

export default linkTo;
