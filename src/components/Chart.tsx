import React from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import { api } from "~/utils/api";

export default function Chart() {
  const [ref, bounds] = useMeasure();
  const { data } = api.exercise.getRandomExercise.useQuery();

  if (!data) return;
  console.log(data);
  return (
    <>
      <h2 className="text-center text-2xl capitalize">{data.exerciseName}</h2>
      <div ref={ref} className="relative h-full w-full">
        {bounds.width > 0 && (
          <InnerChart
            width={bounds.width}
            data={data.data}
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
  data: { createdAt: Date; weight: number }[];
  width: number;
  height: number;
}) {
  const filteredData = data.map((data) => {
    return {
      createdAt: data.createdAt.getDate(),
      weight: data.weight,
    };
  });
  console.log(data);
  const dummyData = [
    [0, 6],
    [5, 10],
    [10, 35],
    [15, 50],
    [50, 60],
    [140, 140],
    [180, 60],
  ];

  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  const xScale = d3
    .scaleLinear()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .domain(d3.extent(dummyData.map((d) => d[0])))
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .domain(d3.extent(dummyData.map((d) => d[1])))
    .range([height - margin.top, margin.bottom]);
  const line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const d = line(dummyData);
  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <path d={d} fill="none" stroke="currentColor" />
      </svg>
    </>
  );
}
