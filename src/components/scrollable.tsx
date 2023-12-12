import { ReactNode, useEffect, useRef } from "react";
import Spinner from "./spinner";

interface ScrollableProps {
  children: ReactNode;
  loadMore: () => void;
  doneLoading: boolean;
}
function Scrollable({ children, loadMore, doneLoading }: ScrollableProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadMore]);

  return (
    <div className="relative">
      {children}
      {!doneLoading && (
        <>
          <div
            ref={loadMoreRef}
            className="absolute bottom-0 h-[36rem] w-full"
          ></div>
          <div className="m-5 mx-auto my-auto h-24 w-24 p-5">
            <Spinner />
          </div>
        </>
      )}
    </div>
  );
}

export default Scrollable;
