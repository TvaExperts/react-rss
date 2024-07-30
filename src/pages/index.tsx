import { wrapper } from '@/store/store';
import {
  AppSearchParams,
  getRunningQueriesThunk,
  productApi,
} from '@/services/api';
import MainContainer from '../components/mainContainer/mainContainer';

export default function Home({ data }) {
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
      productApi.endpoints.getSearchProductsOnPage.initiate(appSearchParams)
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data },
    };
  }
);
