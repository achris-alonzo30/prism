const RotatingGradientButton = () => {
    return (
      <button className='relative inline-flex h-6 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
        <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#2bf8b5_0%,#D32AF7_50%,#2bf8b5_100%)]' />
        <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-2 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
          Beta
        </span>
      </button>
    );
  };
  
  export default RotatingGradientButton;
  