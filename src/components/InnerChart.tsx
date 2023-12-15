import * as d3 from "d3";
import { motion } from "framer-motion";
import * as datefns from "date-fns";
import React from "react";

interface InnerChartProps<T> {
  data: T[];
  width: number;
  height: number;
}

interface ChartData {
  x: number | Date;
  y: number;
  yInfo?: string;
}
export function InnerChart<T extends ChartData>({
  width,
  height,
  data,
}: InnerChartProps<T>) {
  const margin = {
    top: 25,
    right: 20,
    bottom: 25,
    left: 25,
  };

  const xScale = d3
    .scaleLinear()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .domain(d3.extent(data.map((d) => d.x)))
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .domain(d3.extent(data.map((d) => d.y)))
    .range([height - margin.top, margin.bottom]);
  const line = d3
    .line()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .x((d) => xScale(d.x))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .y((d) => yScale(d.y));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const d = line(data);
  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`}>
        {data.length > 1 && (
          <>
            <motion.path
              initial={{
                pathLength: 0,
              }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="text-blue-400"
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            />
            {yScale.ticks(3).map((y, index, array) => (
              <g
                className="text-slate-400"
                transform={`translate(0,${yScale(y)})`}
                key={y}
              >
                <line
                  strokeDasharray="1,6"
                  x1={margin.left}
                  x2={width - margin.right}
                  stroke="currentColor"
                />
                <text
                  alignmentBaseline="middle"
                  className="text-sm "
                  fill="currentColor"
                >
                  {y}
                </text>
              </g>
            ))}
            {xScale.ticks(data.length - 1).map((x) => {
              const date = datefns.fromUnixTime(x / 1000);
              const formated = datefns.format(date, "MMM");
              return (
                <g
                  transform={`translate(${xScale(x)},${height})`}
                  className="text-slate-400"
                  key={x}
                >
                  <text
                    className="text-sm "
                    textAnchor="middle"
                    fill="currentColor"
                  >
                    {/*This is a check if x is a unixdate or just a number */}
                    {x > 10000 ? formated : x}
                  </text>
                </g>
              );
            })}
          </>
        )}
      </svg>
    </>
  );
}
