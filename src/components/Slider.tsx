"use client";

import React, { useState } from "react";
import styled from "styled-components";

const SliderWrapper = styled.div`
  width: 100%;
  padding: 50px 0;
  position: relative;
`;

const Labels = styled.div`
  color: rgba(3, 23, 22, 1);

  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.div`
  background: #f0f0f0;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 14px;
`;

const RangeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
`;

const SliderTrack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 8px;
  width: 100%;
  background-color: #eee;
  border-radius: 5px;
`;

const SliderRange = styled.div<{ minPercent: number; maxPercent: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 8px;
  background-color: #081412;
  border-radius: 5px;
  left: ${({ minPercent }) => `${minPercent}%`};
  width: ${({ minPercent, maxPercent }) => `${maxPercent - minPercent}%`};
`;

const ThumbInput = styled.input`
  position: absolute;
  width: 100%;
  height: 24px;
  background: none;
  pointer-events: none;
  appearance: none;
  left: 0;

  &::-webkit-slider-thumb {
    pointer-events: all;
    width: 32px;
    height: 32px;
    background: #081412;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    appearance: none;
  }

  &::-moz-range-thumb {
    pointer-events: all;
    width: 32px;
    height: 32px;
    background: #081412;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
`;

export default function BudgetSlider() {
  const min = 0;
  const max = 500000;

  const [minVal, setMinVal] = useState(100000);
  const [maxVal, setMaxVal] = useState(400000);

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  return (
    <SliderWrapper>
      <Labels>
        <Label>{Math.round(minVal / 1000)}k$</Label>
        <Label>{Math.round(maxVal / 1000)}k$</Label>
      </Labels>

      <RangeContainer>
        <SliderTrack />
        <SliderRange minPercent={minPercent} maxPercent={maxPercent} />

        {/* Min Thumb */}
        <ThumbInput
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) =>
            setMinVal(Math.min(Number(e.target.value), maxVal - 10000))
          }
          style={{
            zIndex: minVal > max - 100000 ? "5" : "3",
          }}
        />

        {/* Max Thumb */}
        <ThumbInput
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) =>
            setMaxVal(Math.max(Number(e.target.value), minVal + 10000))
          }
        />
      </RangeContainer>
    </SliderWrapper>
  );
}
