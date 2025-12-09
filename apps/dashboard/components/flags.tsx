export function FlagGB() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-full overflow-hidden"
    >
      <circle cx="16" cy="16" r="16" fill="white" />
      <mask id="mask-gb" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        <circle cx="16" cy="16" r="16" fill="white" />
      </mask>
      <g mask="url(#mask-gb)">
        <rect width="32" height="32" fill="#012169" />
        <path
          d="M0 0L32 32M32 0L0 32"
          stroke="white"
          strokeWidth="6.4"
        />
        <path
          d="M0 0L32 32M32 0L0 32"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path
          d="M16 0V32M0 16H32"
          stroke="white"
          strokeWidth="10.6"
        />
        <path
          d="M16 0V32M0 16H32"
          stroke="#C8102E"
          strokeWidth="6.4"
        />
      </g>
    </svg>
  );
}

export function FlagID() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-full overflow-hidden"
    >
      <mask id="mask-id" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        <circle cx="16" cy="16" r="16" fill="white" />
      </mask>
      <g mask="url(#mask-id)">
        <rect width="32" height="16" fill="#FF0000" />
        <rect y="16" width="32" height="16" fill="white" />
      </g>
    </svg>
  );
}
