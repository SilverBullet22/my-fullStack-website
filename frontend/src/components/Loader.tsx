import { Bars } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center text-center'>
      <Bars
          height="80"
          width="80"
          color="#10b981"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
      />
    </div>
  )
}
