import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          marginLeft: '15%',
          marginRight: '10%',
          height: '100%',
        }}
        className='row'
      >
        <h1 className={'display-3'}>About PartTime.Dev</h1>
        <p className={'lead'}>
          PartTime.Dev is a job board tailored for indiviudals within the
          technology sector looking for part time positions. Currently, serving
          only Washington State & and California.
        </p>
        <h2>
          Full Stack Project Developed by Leo Lazzarini{' '}
          <a
            style={{
              display: 'inline-block',
            }}
            href='https://github.com/leolazz'
          >
            <h3>Github </h3>
          </a>
          -
          <a
            style={{
              display: 'inline-block',
            }}
            href='https://www.linkedin.com/in/leo-lazzarini-7981b461/'
          >
            <h3> LinkedIn</h3>
          </a>
        </h2>
      </div>
    </div>
  );
};
export default About;
