import useCopyClipboard from "../hook/useCopyClipboard"

export default function CopyHelper(props: {
  toCopy: string
  className?: string
  children?: React.ReactNode
}) {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <div className={`flex items-center ${props.className}`} onClick={() => setCopied(props.toCopy)}>
      {isCopied ? '' : props.children}
      {isCopied ? (
        <>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-4 h-4'
          >
            <path
              fillRule='evenodd'
              d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
              clipRule='evenodd'
            />
          </svg>
          <span className='ml-2 text-sm'>Copied</span>
        </>
      ) : (
        <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-1"
      >
        <rect x="3" y="7" width="10" height="10" rx="2" stroke="#EC6E72" />
        <path
          d="M7 5V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V11C17 12.1046 16.1046 13 15 13V13"
          stroke="#EC6E72"
        />
      </svg>
      )}
     
    </div>
  )
}
