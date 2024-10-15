import React from 'react';
import { Tabs, Badge } from 'antd';

const { TabPane } = Tabs;

const OrderTabs = ({ activeTab, tabCounts, onTabChange }) => {
  return (
    <Tabs activeKey={activeTab} onChange={onTabChange} className="custom-tabs">
      <TabPane tab={<Badge count={tabCounts.all} offset={[10, 0]}><span>All</span></Badge>} key="all" />
      <TabPane tab={<Badge count={tabCounts.pending} offset={[10, 0]}><span>Pending</span></Badge>} key="pending" />
      <TabPane tab={<Badge count={tabCounts.processing} offset={[10, 0]}><span>Processing</span></Badge>} key="processing" />
      <TabPane tab={<Badge count={tabCounts.shipped} offset={[10, 0]}><span>Shipped</span></Badge>} key="shipped" />
      <TabPane tab={<Badge count={tabCounts.delivered} offset={[10, 0]}><span>Delivered</span></Badge>} key="delivered" />
      <TabPane tab={<Badge count={tabCounts.canceled} offset={[10, 0]}><span>Canceled</span></Badge>} key="canceled" />
    </Tabs>
  );
};

export default OrderTabs;
