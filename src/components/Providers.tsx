import { NextAuthProvider } from '@/contexts/nextAuthProvider';
import { ChildrenType } from '@/types/common';

type Props = ChildrenType;

const Providers = async (props: Props) => {
  // Props
  const { children } = props;

  return <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>{children}</NextAuthProvider>;
};

export default Providers;
