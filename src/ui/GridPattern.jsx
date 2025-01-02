import { useId } from "react";

const GridPattern = ({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}) => {
  const id = useId();

  return (
    <svg
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 h-full w-[90%] left-[50%] transform -translate-x-1/2 fill-gray-400/30 stroke-gray-400/30 ${className}`}
    {...props}
  >
  
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
        {/* <mask id="fading-mask"> */}
          {/* <rect x="0" y="0" width="100%" height="100%" fill="white" /> */}
          {/* Circle that fades outwards from the center */}
          <circle cx="50%" cy="50%" r="45%" fill="black" />
        {/* </mask> */}
      </defs>
      {/* <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${id})`}
        mask="url(#fading-mask)"  // Apply the fading effect here
      /> */}
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
};

export default GridPattern;


