import styled, { keyframes } from "styled-components";

const loader = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const RingDiv = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: ${loader} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: rgb(158, 175, 158) transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const RingContainer = styled.div`
  margin: 1rem auto;
  //display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

function LoadingSpinner() {
  return (
    <RingContainer>
      <RingDiv />
      <RingDiv />
      <RingDiv />
      <RingDiv />
    </RingContainer>
  );
}

export default LoadingSpinner;
