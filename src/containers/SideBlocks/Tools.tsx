import { ReactElement } from 'react';
import styled from 'styled-components';

import { TOOLS } from '../../assets/constants/tools';
import { useColFlex } from './useColFlex';
import { BaseCol, Title } from './SideBlocks.styles';

const ToolContainer = styled(BaseCol)`
  display: flex;
  flex-flow: row wrap;
  height: auto;
  * {
    z-index: 1;
  }
`;

const ToolLink = styled.a`
  margin: 6px;
`;

const Tool = styled.span`
  height: 40px;
  border-radius: 20px;
  line-height: 40px;
  background: var(--color-text-fourth);
  padding: 3px 8px 3px 2px;
`;

const IconBox = styled.div`
  display: inline-block;
  border-radius: 50%;
  background: #fff;
  position: relative;
  height: 40px;
  width: 40px;
  margin-right: 2px;
`;

const ToolIcon = styled.img`
  border-radius: 50%;
  font-size: 36px;
  overflow: hidden;
  position: absolute;
  margin: auto;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
`;

const ToolName = styled.span`
  transition: color 0.3s;
  line-height: 40px;
  color: var(--color-text);

  ${Tool}:hover & {
    color: var(--color-link-hover);
  }
`;

interface ToolItemProps {
  data: {
    name: string;
    icon: string;
    url: string;
  };
}

const ToolItem = ({
  data: { url, icon, name },
}: ToolItemProps): ReactElement => (
  <ToolLink href={url} target="_blank" rel="noreferrer" title={url} key={name}>
    <Tool>
      <IconBox>
        <ToolIcon src={icon} alt="" />
      </IconBox>
      <ToolName>{name}</ToolName>
    </Tool>
  </ToolLink>
);

/* Tools url */
export const Tools = () => {
  const colFlex = useColFlex();

  return (
    <ToolContainer flex={colFlex}>
      <Title>Tools</Title>
      {TOOLS.map((tool) => (
        <ToolItem data={tool} key={tool.name} />
      ))}
    </ToolContainer>
  );
};
