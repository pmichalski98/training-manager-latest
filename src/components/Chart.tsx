import React from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";
import { motion } from "framer-motion";

export default function Chart() {
  const [ref, bounds] = useMeasure();
  const { data: entries } = api.exercise.getRandomExercise.useQuery();
  if (!entries) return;
  const data = entries.data.map((weight, index) => {
    return {
      weight: weight.weight,
      trainingsCount: index + 1,
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

function InnerChart({
  width,
  height,
  data,
}: {
  data: { weight: number; trainingsCount: number }[];
  width: number;
  height: number;
}) {
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
    .domain(d3.extent(data.map((d) => d.trainingsCount)))
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .domain(d3.extent(data.map((d) => d.weight)))
    .range([height - margin.top, margin.bottom]);
  const line = d3
    .line()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .x((d) => xScale(d.trainingsCount))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .y((d) => yScale(d.weight));
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
            {yScale.ticks(5).map((weight, index, array) => (
              <g
                className="text-slate-400"
                transform={`translate(0,${yScale(weight)})`}
                key={weight}
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
                  {weight}
                </text>
              </g>
            ))}
            {xScale.ticks(data.length - 1).map((trainingsCount) => (
              <g
                transform={`translate(${xScale(trainingsCount)},${height})`}
                className="text-slate-400"
                key={trainingsCount}
              >
                <text
                  className="text-sm "
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {trainingsCount}
                </text>
              </g>
            ))}
          </>
        )}
      </svg>
    </>
  );
}
