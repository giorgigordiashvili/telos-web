'use client';

import React from 'react';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  width: 100%;
  padding-bottom: 13px;
  padding-top: 24px;
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

const SliderRange = styled.div<{
  $minPercent: number;
  $maxPercent: number;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 8px;
  background-color: #081412;
  border-radius: 5px;

  /* use the transient props for positioning */
  left: ${({ $minPercent }) => `${$minPercent}%`};
  width: ${({ $minPercent, $maxPercent }) => `${$maxPercent - $minPercent}%`};
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

type Props = {
  minValue: number;
  maxValue: number;
  onChange: (values: { min: number; max: number }) => void;
};

export default function BudgetSlider({ minValue, maxValue, onChange }: Props) {
  const min = 0;
  const max = 500000;

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  return (
    <SliderWrapper>
      <Labels>
        <Label>{Math.round(minValue / 1000)}k$</Label>
        <Label>{Math.round(maxValue / 1000)}k$</Label>
      </Labels>

      <RangeContainer>
        <SliderTrack />

        {/* pass the transient props */}
        <SliderRange $minPercent={minPercent} $maxPercent={maxPercent} />

        <ThumbInput
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={e =>
            onChange({
              min: Math.min(Number(e.target.value), maxValue - 10000),
              max: maxValue,
            })
          }
          style={{
            zIndex: minValue > max - 100000 ? 5 : 3,
          }}
        />

        <ThumbInput
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={e =>
            onChange({
              min: minValue,
              max: Math.max(Number(e.target.value), minValue + 10000),
            })
          }
        />
      </RangeContainer>
    </SliderWrapper>
  );
}
