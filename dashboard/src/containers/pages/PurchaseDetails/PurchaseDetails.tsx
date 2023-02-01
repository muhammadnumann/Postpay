import getInstalmentPlanDetailsQuery from '@/queries/getInstalmentPlanDetails.graphql';
import { useQuery } from '@apollo/client';
import PurchaseDetails from '@/components/PurchaseDetails';
import { DashboardLayout } from '@/components/layouts';
import { useMemo, useState } from 'react';
import { useParams, useRoutes, useSearchParams } from 'react-router-dom';
import PayModal from '@/components/PurchaseDetails/PayModal';
import { findNextPayableInstalment } from '@/helpers/helpers';
import PayInstalmentModal from './PayInstalmentModal';
import { PayType } from '@/constants/enums';
import { InstalmentPlan } from '@/graphql/index';
import Spinner from '@/components/common/Spinner';

const PurchaseDetailsContainer = () => {
  const [showPayCardModal, setShowPayCardModal] = useState(false);
  const [showChangeCardModal, setShowChangeCardModal] = useState(false);
  const [payType, setPayType] = useState<PayType | null>(null);
  const { instalmentPlanId } = useParams();
  const {
    data: instalmentPlanData,
    loading,
    refetch,
  } = useQuery(getInstalmentPlanDetailsQuery, {
    variables: {
      id: instalmentPlanId,
    },
  });

  const instalmentPlan: InstalmentPlan | null = useMemo(() => {
    return instalmentPlanData ? instalmentPlanData.instalmentPlan : null;
  }, [instalmentPlanData]);

  const instalment = useMemo(
    () => instalmentPlan && findNextPayableInstalment(instalmentPlan),
    [instalmentPlan]
  );

  return (
    <DashboardLayout>
      <>
        {loading && (
          <div className="relative h-[300px]">
            <Spinner />
          </div>
        )}

        {showPayCardModal &&
          instalmentPlan &&
          instalment &&
          payType !== null && (
            <PayInstalmentModal
              closeModalFn={() => setShowPayCardModal(false)}
              instalment={instalment}
              instalmentPlan={instalmentPlan}
              payType={payType}
              refetch={refetch}
            />
          )}

        {showChangeCardModal && instalmentPlan && instalment && (
          <PayInstalmentModal
            closeModalFn={() => setShowChangeCardModal(false)}
            instalment={instalment}
            instalmentPlan={instalmentPlan}
            payType={payType}
            refetch={refetch}
            isChangeCard
          />
        )}
        {instalmentPlan && !loading && (
          <PurchaseDetails
            payFullFn={() => {
              setShowPayCardModal(true);
              setPayType(PayType.PayInFull);
            }}
            payInstalmentFn={() => {
              setShowPayCardModal(true);
              setPayType(PayType.PayInstalment);
            }}
            changeCardFn={() => setShowChangeCardModal(true)}
            instalmentPlan={instalmentPlan}
          />
        )}
      </>
    </DashboardLayout>
  );
};

export default PurchaseDetailsContainer;
