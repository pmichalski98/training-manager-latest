import React from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";
import { motion } from "framer-motion";

export default function RandomChart() {
  const [ref, bounds] = useMeasure();
  // @ts-ignore
  const { data: entries } = api.stats.getRandomExercise.useQuery({
    cacheTime: 0,
  });
  if (!entries) return;
  const data = entries.data.map((weight, index) => {
    return {
      x: weight.weight,
      y: index + 1,
    };
  });

  return (
    <>
      <div className="space-y-1 font-medium">
        <h2 className="text-sm  uppercase text-slate-400">
          your stats at a glance
        </h2>
        <p>Weight per training</p>
      </div>
      <p className="text-center text-2xl capitalize">{entries.exerciseName}</p>
      <div ref={ref} className="relative h-full w-full ">
        {bounds.width > 0 && (
          <InnerChart
            key={entries.exerciseName}
            width={bounds.width}
            data={data}
            height={bounds.height}
          />
        )}
      </div>
    </>
  );
}

interface InnerChartProps<T> {
  data: T[];
  width: number;
  height: number;
}

interface ChartData {
  x: number;
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
    .domain(d3.extent(data.map((d) => d.y)))
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .domain(d3.extent(data.map((d) => d.x)))
    .range([height - margin.top, margin.bottom]);
  const line = d3
    .line()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .x((d) => xScale(d.y))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .y((d) => yScale(d.x));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const d = line(data);
  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`}>
        {data.length <= 1 ? (
          <text
            y={height / 2}
            className="mx-auto text-center text-xl"
            fill="currentColor"
            alignmentBaseline="middle"
          >
            Not enough data for this exercise
          </text>
        ) : (
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
            {yScale.ticks(5).map((y, index, array) => (
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
                    fix this
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
