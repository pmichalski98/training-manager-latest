import React from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";

export default function Chart() {
  const [ref, bounds] = useMeasure();

  return (
    <div ref={ref} className="relative h-full w-full">
      {bounds.width > 0 && (
        <InnerChart width={bounds.width} height={bounds.height} />
      )}
    </div>
  );
}

function InnerChart({ width, height }: { width: number; height: number }) {
  console.log(height, width);
  const data = [
    [0, 6],
    [5, 10],
    [10, 35],
    [15, 50],
    [50, 60],
    [140, 140],
    [180, 60],
  ];

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d[0])))
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d[1])))
    .range([height, 0]);
  const line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));
  const d = line(data);
  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <path d={d} fill="none" stroke="currentColor" />
      </svg>
    </>
  );
}
