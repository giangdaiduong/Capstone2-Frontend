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
    edit: `${ideaBase}/edit/[ideaCode]`,
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

const investor = () => {
  const base = '/investor';

  return {
    base,
    listIdea: `${base}/list-ideas`,
    profile: `${base}/profile`,
  };
};

const linkTo = {
  home: '/',
  admin: adminRoutes(),
  login: '/login',
  register: '/register',
  follower: '/follower',
  feed: '/feed',
  newsFeed: '/news-feed',
  chat: '/chat',
  profile: '/profile',
  refreshToken: '/refresh-token',
  logout: '/logout',
  user: userRoutes(),
  investor: investor(),
  forgotPassword: '/forgot-password',
};

export default linkTo;
