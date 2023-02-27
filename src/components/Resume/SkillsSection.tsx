import { ReactElement } from 'react';

import { Section } from './Resume.styles';

export const SkillsSection = (): ReactElement => (
  <Section id="resume-skills">
    <h1 data-el> MY SKILLS </h1>
    <div data-el>
      <p>
        <strong> 语言: </strong> Javascript, Typescript <br />
        <strong> 前端: </strong> React, Vue <br />
        <strong> 后端: </strong> Express, Graphql, REST, PostgreSQL <br />
        <strong> 运维: </strong> AWS, Docker <br />
        <strong> 英语: </strong> CEFR B1, CET-6 <br />
        <strong> 设计: </strong> Figma, PS <br />
        <strong> 其他: </strong> Threejs, Echarts, D3 <br />
      </p>
    </div>
  </Section>
);
