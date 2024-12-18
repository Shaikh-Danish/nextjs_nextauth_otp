import style from '@/styles/loading.module.css';

interface LoadingProps {
  isVisible: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="ml-[80px]" role="loading">
      <div className={style.loader}></div>
    </div>
  );
};

export default Loading;
