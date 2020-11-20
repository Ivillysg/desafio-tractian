import React from 'react';

import './style.scss';
import CountUp from 'react-countup';

interface Props {
  icon: any;
  title: string;
  value: number;
}

const Widget: React.FC<Props> = ({ icon, title, value }) => {
  return (
    <div className="widget">
      <span className="icon">{icon}</span>
      <div className="info">
        <span>{title}</span>
        <h4>
          <CountUp end={value} />
        </h4>
      </div>
    </div>
  );
};

export default Widget;
