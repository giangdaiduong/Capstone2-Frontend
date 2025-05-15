const adminRoutes = () => {
  const base = '/admin';
  const productBase = `${base}/product`;
  const postBase = `${base}/post`;
  const userBase = `${base}/user`;

  return {
    base,
    home: `${base}/home`,
    theme: `${base}/theme`,
    setting: `${base}/page-setting`,
    order: `${base}/order`,
    category: `${base}/category`,
    product: {
      new: `${productBase}/new`,
      edit: `${productBase}/[id]`,
      list: `${productBase}`,
    },
    post: {
      new: `${postBase}/new`,
      edit: `${postBase}/[id]`,
      category: `${postBase}/category`,
      tag: `${postBase}/tag`,
      list: `${postBase}`,
    },
    user: {
      list: `${userBase}`,
    },
  };
};

const userRoutes = () => {
  const base = '/user';

  return {
    base,
    ideas: `${base}/ideas`,
  };
};

const linkTo = {
  home: '/',
  admin: adminRoutes(),
  login: '/login',
  register: '/register',
  user: userRoutes(),
};

export default linkTo;
