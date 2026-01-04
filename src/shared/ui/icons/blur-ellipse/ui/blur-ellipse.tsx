import { FCIcon } from '@/shared/types';

export const BlurEllipse: FCIcon = (props) => {
  return (
    <svg
      width="1440"
      height="850"
      viewBox="0 0 1440 850"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <g filter="url(#filter0_f_1_202)">
        <circle cx="1406" cy="-83" r="392" fill="#AA580D" />
      </g>
      <g filter="url(#filter1_f_1_202)">
        <circle cx="142" cy="909" r="473" fill="#AA580D" />
      </g>
      <defs>
        <filter
          id="filter0_f_1_202"
          x="601.925"
          y="-887.075"
          width="1608.15"
          height="1608.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="206.038"
            result="effect1_foregroundBlur_1_202"
          />
        </filter>
        <filter
          id="filter1_f_1_202"
          x="-743.075"
          y="23.9249"
          width="1770.15"
          height="1770.15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="206.038"
            result="effect1_foregroundBlur_1_202"
          />
        </filter>
      </defs>
    </svg>
  );
};
