import React, { useState } from 'react';
import Title from '../components/Title';
import { InnerLayout, MainLayout } from '../styles/Layouts';

import portfolios from '../data/portfolios';
import Menu from '../components/Menu';
import Button from '../components/Button';

const allButtons = ['All', ...new Set(portfolios.map((item) => item.category))];

const PortfolioPage = () => {
  const [menuItem, setMenuItems] = useState(portfolios);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [button, setButtons] = useState(allButtons);

  const filter = (button: string) => {
    if (button === 'All') {
      setMenuItems(portfolios);
      return;
    }

    const filteredData = portfolios.filter((item) => item.category === button);
    setMenuItems(filteredData);
  };

  return (
    <MainLayout>
      <Title title={'Portfolio'} span={'Portfolio'} />
      <InnerLayout>
        <Button filter={filter} button={button} />
        <Menu menuItem={menuItem} />
      </InnerLayout>
    </MainLayout>
  );
};

export default PortfolioPage;
