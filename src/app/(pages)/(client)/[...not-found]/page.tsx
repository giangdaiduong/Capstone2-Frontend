import Providers from '@/components/Providers';
import linkTo from '@/utils/linkTo';
import Link from 'next/link';

const NotFoundPage = async () => {
  return (
    <Providers>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Điều gì đó bị thiếu.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Xin lỗi, chúng tôi không tìm thấy trang bạn đang tìm kiếm. Bạn sẽ tìm thấy nhiều điều thú vị trên trang
              chủ.
            </p>
            <Link
              href={linkTo.home}
              className="inline-flex text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
            >
              Trở lại trang chủ
            </Link>
          </div>
        </div>
      </section>
    </Providers>
  );
};

export default NotFoundPage;
