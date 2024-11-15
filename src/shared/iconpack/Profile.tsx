import { SVGProps } from 'react'

interface ProfileProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string; 
  }

export const Profile = ({ strokeColor='#161F29', ...props}: ProfileProps) => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 17.1115C1 14.6984 2.69732 12.643 5.00404 12.2627L5.21182 12.2284C7.05892 11.9239 8.94108 11.9239 10.7882 12.2284L10.996 12.2627C13.3027 12.643 15 14.6984 15 17.1115C15 18.1545 14.1815 19 13.1719 19H2.82813C1.81848 19 1 18.1545 1 17.1115Z"
      stroke={strokeColor}
      strokeWidth="1.5"
    />
    <path
      d="M12.0834 4.9375C12.0834 7.11212 10.2552 8.875 8.00002 8.875C5.74486 8.875 3.91669 7.11212 3.91669 4.9375C3.91669 2.76288 5.74486 1 8.00002 1C10.2552 1 12.0834 2.76288 12.0834 4.9375Z"
      stroke={strokeColor}
      strokeWidth="1.5"
    />
  </svg>
)
