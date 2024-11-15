import { SVGProps } from 'react'

interface TasksProps extends SVGProps<SVGSVGElement> {
  strokeColor?: string
}

export const Tasks = ({ strokeColor = '#161F29', ...props }: TasksProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.07008 1V3.51375M13.9299 1V3.51375M1.83327 13.2485C1.38891 11.3097 1.38891 9.292 1.83327 7.35323C2.44858 4.66865 4.49673 2.57251 7.11985 1.94279C9.01424 1.48802 10.9858 1.48802 12.8801 1.94279C15.5033 2.57251 17.5514 4.66865 18.1667 7.35323C18.6111 9.292 18.6111 11.3097 18.1667 13.2485C17.5514 15.9331 15.5033 18.0292 12.8801 18.6589C10.9858 19.1137 9.01424 19.1137 7.11986 18.6589C4.49673 18.0292 2.44858 15.9331 1.83327 13.2485Z"
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M5.5 8.85714L6.5 9.71429L8.5 8M5.5 13.1429L6.5 14L8.5 12.2857M11 9.28571H14.5M11 13.5714H14.5"
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
