import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { setActiveTab } from '../slices/tabsSlice';
export const useProductTabs = (productId: string) => {
  const dispatch = useDispatch();
  const tabState = useSelector(
    (state: RootState) => state.productTabs[productId]
  );

  const activeTab = tabState?.activeTab || 'overview';
  const lastVisitedTab = tabState?.lastVisitedTab;

  const changeTab = (tab: string) => {
    dispatch(setActiveTab({ productId, tab }));
  };

  return { activeTab, lastVisitedTab, changeTab };
};