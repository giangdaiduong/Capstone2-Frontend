import './Loading.css';

function LoadingComponent({ className }: { className?: string }) {
  return (
    <div className={`loading_component ${className}`}>
      <div className='loader'>
        <div className='loader_overlay' />
        <div className='loader_cogs'>
          <div className='loader_cogs__top'>
            <div className='top_part' />
            <div className='top_part' />
            <div className='top_part' />
            <div className='top_hole' />
          </div>
          <div className='loader_cogs__left'>
            <div className='left_part' />
            <div className='left_part' />
            <div className='left_part' />
            <div className='left_hole' />
          </div>
          <div className='loader_cogs__bottom'>
            <div className='bottom_part' />
            <div className='bottom_part' />
            <div className='bottom_part' />
            <div className='bottom_hole'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingComponent;
