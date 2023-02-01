import { useQuery } from '@apollo/client';
import { useContext, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import cx from 'classnames';
import { DashboardLayout } from '@/components/layouts';
import Tab from '@/components/PurchaseList/Tab/Tab';
import getInstalmentPlansQuery from '@/queries/getInstalmentPlans.graphql';
import { InstalmentPlan, InstalmentPlanEdge } from '@/graphql/index';
import PurchaseListItem from '@/components/PurchaseList/PurchaseListItem';
import { DashboardContext } from '@/contexts/DashboardContext';
import history from '@/helpers/history';
import Spinner from '@/components/common/Spinner';
import { PayType } from '@/constants/enums';
import PayInstalmentModal from '../PurchaseDetails/PayInstalmentModal';
import { findNextPayableInstalment } from '@/helpers/helpers';
import Notifications from './Notifications';
import { useTranslation } from 'react-i18next';

const PurchaseList = () => {
  const { t } = useTranslation();
  const { currency } = useContext(DashboardContext);
  const [status, setStatus] = useState('OnGoing');
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [lastCursor, setLastCursor] = useState<String | null>(null);
  const [payingInstalmentPlan, setPayingInstalmentPlan] =
    useState<InstalmentPlan | null>(null);
  const [instalmentPlans, setInstalmentPlans] = useState<Array<InstalmentPlan>>(
    []
  );
  const [animationIndex, setAnimationIndex] = useState(0);
  const payingInstalment = useMemo(() => {
    if (payingInstalmentPlan) {
      return findNextPayableInstalment(payingInstalmentPlan);
    }
  }, [payingInstalmentPlan]);

  const {
    data: getInstalmentPlansData,
    loading,
    error,
    refetch,
  } = useQuery(getInstalmentPlansQuery, {
    variables: {
      status: status.toLowerCase(),
      currency,
      first: 5,
      before: null,
      after: null,
      last: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refresh();
  }, [currency]);

  useEffect(() => {
    if (!getInstalmentPlansData?.instalmentPlans?.edges?.length) {
      return;
    }

    if (
      getInstalmentPlansData &&
      getInstalmentPlansData?.instalmentPlans &&
      getInstalmentPlansData?.instalmentPlans.edges.length === 0
    ) {
      setCanLoadMore(false);
    } else {
      setLastCursor(
        getInstalmentPlansData?.instalmentPlans?.pageInfo.endCursor
      );
      setAnimationIndex(instalmentPlans.length);
      const _instalmentPlans: Array<InstalmentPlan> = [...instalmentPlans];
      getInstalmentPlansData?.instalmentPlans?.edges?.forEach(
        (edge: InstalmentPlanEdge) => {
          if (edge.node) {
            _instalmentPlans.push(edge.node);
          }
        }
      );
      setInstalmentPlans(_instalmentPlans);
    }
  }, [getInstalmentPlansData]);

  async function onChangeTab(name: string) {
    setStatus(name);
    setInstalmentPlans([]);
    setLastCursor(null);
    setCanLoadMore(true);
    await refetch({
      status: name.toLowerCase(),
      currency,
      first: 5,
      before: null,
      after: null,
      last: null,
    });
  }

  function viewDetailFn(id) {
    history.push('/instalment-plans/' + id);
  }

  async function loadMore() {
    await refetch({
      status: status.toLowerCase(),
      currency,
      //@ts-ignore
      after: lastCursor,
      before: null,
      last: null,
    });
  }

  function refresh() {
    setInstalmentPlans([]);
    setLastCursor(null);
    setCanLoadMore(true);
    refetch({
      status: status.toLowerCase(),
      currency,
      first: 5,
      before: null,
      after: null,
      last: null,
    });
  }

  return (
    <>
      <Notifications refresh={refresh} />

      {payingInstalmentPlan && payingInstalment && (
        <PayInstalmentModal
          instalmentPlan={payingInstalmentPlan}
          instalment={payingInstalment}
          payType={PayType.PayInstalment}
          closeModalFn={() => {
            setPayingInstalmentPlan(null);
          }}
          refetch={refresh}
        />
      )}

      <DashboardLayout>
        <>
          <div className="lg:text-[26px] text-[24px] custom-font-bold rtl:custom-font-demi-bold">
            {t('Purchases')}
          </div>
          <Tab onChange={onChangeTab} />

          <InfiniteScroll
            dataLength={instalmentPlans.length || 0} //This is important field to render the next data
            next={loadMore}
            hasMore={canLoadMore}
            loader={null}
          >
            <div>
              {instalmentPlans.map((instalmentPlan: InstalmentPlan, index) => (
                <PurchaseListItem
                  key={instalmentPlan.id}
                  instalmentPlan={instalmentPlan}
                  isActive={false}
                  payFn={(instalmentPlan: InstalmentPlan) => {
                    setPayingInstalmentPlan(instalmentPlan);
                  }}
                  viewDetailFn={viewDetailFn}
                  delayAnimationIndex={index - animationIndex}
                />
              ))}
            </div>
          </InfiniteScroll>
          <div
            className={cx(
              'relative h-[200px] transition duration-150 opacity-0',
              {
                'opacity-100': loading,
              }
            )}
          >
            <Spinner />
          </div>
        </>
      </DashboardLayout>
    </>
  );
};

export default PurchaseList;
