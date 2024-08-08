import { wrapper } from '@/store/store';
import {
  getRunningQueriesThunk,
  productApi,
  ProductsApiResponse,
} from '@/services/api';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
  isEmptySearchParams,
} from '@/utils/searchParams';
import { AppSearchParams } from '@/models/searchParams';
import { MainContainer } from '@/components/mainContainer/mainContainer';

export default function Home({ data }: { data: ProductsApiResponse }) {
  return <MainContainer productsApiResponse={data} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const appSearchParams: AppSearchParams = getAppSearchParamsFromQuery(
      context.query
    );

    if (isEmptySearchParams(context.query)) {
      return {
        redirect: {
          destination: `/?${createSearchParams(appSearchParams)}`,
          permanent: false,
        },
      };
    }

    const { data } = await store.dispatch(
      productApi.endpoints.getProductsByParams.initiate(appSearchParams)
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data },
    };
  }
);
