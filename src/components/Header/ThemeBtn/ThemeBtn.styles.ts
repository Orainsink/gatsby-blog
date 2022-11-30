/* day/night toggle button */
/* author @ashleynolan https://codepen.io/ashleynolan/pen/wBppKz */
import styled, { css, keyframes } from 'styled-components';

const toggleHeight = '35px';
const toggleWidth = '62px';
const borderWidth = '2px';
const toggleBtnRadius = '28px';
const bgColorNight = '#3c4145';
const borderColorNight = '#1c1c1c';
const toggleBtnBgColorNight = '#fff';
const toggleBtnBorderColorNight = '#e3e3c7';
const bgColorDay = '#9ee3fb';
const borderColorDay = '#86c3d7';
const toggleBtnBgColorDay = '#ffdf6d';
const toggleBtnBorderColorDay = '#e1c348';
const cloudBorderColor = '#d3d3d3';
const cloudBgColor = '#fff';

const StarryStar = keyframes`
50% {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: #fff 15px -1px 0 0, #fff 6px 5px 0 -1px,
      rgba(255, 255, 255, 0.1) 19px 9px 0 1px, #fff 16px 17px 0 0,
      rgba(255, 255, 255, 0.1) 10px 12px 0 -1px, #fff 2px 19px 0 1px;
  }`;

const BounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 100;
    transform: scale(1.1);
  }
  55% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    opacity: 100;
    transform: scale(1);
  }
  `;

const basedBtnStyles = css`
  &,
  &:before,
  &:after {
    transition: all 250ms ease-in;
  }
  &:before,
  &:after {
    content: '';
    display: block;
  }
`;

const ToggleContainer = styled.div`
  display: block;
  text-align: center;
  user-select: none;
  margin-left: var(--space-md);
`;

export const DayNightToggleContainer = styled(ToggleContainer)`
.btn {
    position: relative;
    height: ${toggleHeight};
    width: ${toggleWidth};
    border-radius: ${toggleHeight};

    &:before {
      position: absolute;
      top: 1px;
      left: 2px;
      width: ${toggleBtnRadius};
      height: ${toggleBtnRadius};
      border-radius: 50%;
    }

    border: ${borderWidth} solid ${borderColorNight};
    background-color: ${bgColorNight};

    //toggle button
    &:before {
      background-color: ${toggleBtnBgColorNight};
      border: ${borderWidth} solid ${toggleBtnBorderColorNight};
    }
    &:after {
      position: absolute;
      top: 62%;
      left: calc(${toggleWidth} - ${toggleBtnRadius} - (${borderWidth} * 2) - 10px);
      z-index: 10;
      width: calc(${toggleBtnRadius} / 5);
      height: calc(${toggleBtnRadius} / 5);
      opacity: 0;
      background-color: ${cloudBgColor};
      border-radius: 50%;

      //crazy ass box-shadow to make the cloud
      box-shadow: ${cloudBgColor} 0 0, ${cloudBgColor} 1px 0, ${cloudBgColor} 3px 0,
        ${cloudBgColor} 4px 0, ${cloudBgColor} 5px 0, ${cloudBgColor} 7px 0,
        ${cloudBgColor} 8px 0, ${cloudBgColor} 10px -1px 0 1px,
        ${cloudBgColor} 8px -3px 0 -1px, ${cloudBgColor} 3px -3px 0 1px,
        ${cloudBorderColor} 0 0 0 2px, ${cloudBorderColor} 3px 0 0 2px,
        ${cloudBorderColor} 5px 0 0 2px, ${cloudBorderColor} 8px 0 0 2px,
        ${cloudBorderColor} 10px -1px 0 2px, ${cloudBorderColor} 8px -3px 0 1px,
        ${cloudBorderColor} 3px -7px 0 2px;

      transition: opacity 100ms ease-in;
  }
`;

export const Checkbox = styled.input`
  display: none;
  ${basedBtnStyles}
`;

export const Feature = styled.span<{ isDay: boolean }>`
  display: block;
  position: absolute;
  top: 4px;
  left: 52.5%;
  z-index: 20;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: #fff;

  ${basedBtnStyles}

  box-shadow: rgba(255, 255, 255, 0.1) 15px -1px 0 0,
    rgba(255, 255, 255, 0.1) 6px 5px 0 -1px, #fff 19px 9px 0 1px,
    rgba(255, 255, 255, 0.1) 16px 17px 0 0, #fff 10px 12px 0 -1px,
    rgba(255, 255, 255, 0.1) 2px 19px 0 1px;

  animation: ${StarryStar} 5s ease-in-out infinite;

  &:before {
    position: absolute;
    top: -1px;
    left: -12px;
    width: 9px;
    height: 9px;
    background-color: ${toggleBtnBgColorNight};
    border-radius: 50%;
    border: 2px solid ${toggleBtnBorderColorNight};
    transform-origin: -3px 130%;

    box-shadow: ${toggleBtnBorderColorNight} -14px 0 0 -1px,
      ${toggleBtnBorderColorNight} -4px 12px 0 -1px;
  }

  ${({ isDay }) =>
    isDay &&
    css`
      opacity: 0;
      box-shadow: rgba(255, 255, 255, 0.1) 15px -1px 0 -2px,
        rgba(255, 255, 255, 0.1) 6px 5px 0 -2px, #fff 19px 9px 0 -1px,
        rgba(255, 255, 255, 0.1) 16px 17px 0 -2px, #fff 10px 12px 0 -3px,
        rgba(255, 255, 255, 0.1) 2px 19px 0 -1px;
      animation: none;

      &:before {
        left: 12px;
        transform: rotate(70deg);
      }
    `}
`;

export const Btn = styled.label`
  display: block;
  margin: 0 auto;
  font-size: 0.7em;
  transition: all 350ms ease-in;
  position: relative;
  height: ${toggleHeight};
  width: ${toggleWidth};
  border-radius: ${toggleHeight};
  border: ${borderWidth} solid ${borderColorNight};
  background-color: ${bgColorNight};

  ${basedBtnStyles}

  &:before {
    position: absolute;
    top: 1px;
    left: 2px;
    width: ${toggleBtnRadius};
    height: ${toggleBtnRadius};
    border-radius: 50%;
    background-color: ${toggleBtnBgColorNight};
    border: ${borderWidth} solid ${toggleBtnBorderColorNight};
  }

  &:after {
    position: absolute;
    top: 62%;
    left: calc(
      ${toggleWidth} - (${toggleBtnRadius}) - (${borderWidth} * 2) - 10px
    );
    z-index: 10;
    width: calc(${toggleBtnRadius} / 5);
    height: calc(${toggleBtnRadius} / 5);
    opacity: 0;
    background-color: ${cloudBgColor};
    border-radius: 50%;
    transition: opacity 100ms ease-in;

    // crazy ass box-shadow to make the cloud
    box-shadow: ${cloudBgColor} 0 0, ${cloudBgColor} 1px 0,
      ${cloudBgColor} 3px 0, ${cloudBgColor} 4px 0, ${cloudBgColor} 5px 0,
      ${cloudBgColor} 7px 0, ${cloudBgColor} 8px 0,
      ${cloudBgColor} 10px -1px 0 1px, ${cloudBgColor} 8px -3px 0 -1px,
      ${cloudBgColor} 3px -3px 0 1px, ${cloudBorderColor} 0 0 0 2px,
      ${cloudBorderColor} 3px 0 0 2px, ${cloudBorderColor} 5px 0 0 2px,
      ${cloudBorderColor} 8px 0 0 2px, ${cloudBorderColor} 10px -1px 0 2px,
      ${cloudBorderColor} 8px -3px 0 1px, ${cloudBorderColor} 3px -7px 0 2px;
  }

  &:hover {
    cursor: pointer;
  }

  ${Checkbox}:checked + && {
    background-color: ${bgColorDay};
    border: ${borderWidth} solid ${borderColorDay};

    &:before {
      left: calc(
        ${toggleWidth} - (${toggleBtnRadius}) - (${borderWidth} * 2) - 2px
      );
      background-color: ${toggleBtnBgColorDay};
      border: ${borderWidth} solid ${toggleBtnBorderColorDay};
    }
    &:after {
      opacity: 100;
      animation-name: ${BounceIn};
      animation-duration: 0.6s;
      animation-delay: 0.1s;
      animation-fill-mode: backwards;
      animation-timing-function: ease-in-out;
    }w
  }
`;
