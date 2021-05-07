import React from "react";
import styled from "styled-components";

const TrackLabel = styled.span`
  fontsize: "10px";
  color: #000;
`;

const mark = [
  {
    value: 40000,
    label: <TrackLabel>4.0</TrackLabel>,
  },

  {
    value: 60000,
    label: "",
  },

  {
    value: 80000,
    label: "",
  },

  {
    value: 100000,
    label: <TrackLabel>10.0</TrackLabel>,
  },

  {
    value: 120000,
    label: "",
  },

  {
    value: 140000,
    label: "",
  },

  {
    value: 160000,
    label: <TrackLabel>16.0</TrackLabel>,
  },
];

export default mark;
