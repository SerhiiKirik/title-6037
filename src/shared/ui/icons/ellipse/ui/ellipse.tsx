import { FCIcon } from '@/shared/types';

export const EllipseIcon: FCIcon = (props) => {
  return (
    <svg
      width="201"
      height="301"
      viewBox="0 0 201 301"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <circle
        cx="150.5"
        cy="150.5"
        r="148.5"
        fill="#AD5707"
        stroke="#FFAD32"
        strokeWidth={4}
      />
    </svg>
  );
};
