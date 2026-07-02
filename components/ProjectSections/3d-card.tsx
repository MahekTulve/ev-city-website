"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

const MouseEnterContext = createContext<
  [boolean, (v: boolean) => void] | undefined
>(undefined);

export function CardContainer({
  children,
  className = "",
  containerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } =
      ref.current.getBoundingClientRect();

    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;

    ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const onLeave = () => {
    setEntered(false);

    if (ref.current) {
      ref.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  };

  const onEnter = () => setEntered(true);

  return (
    <MouseEnterContext.Provider value={[entered, setEntered]}>
      <div
        className={`flex items-center justify-center py-4 ${containerClassName}`}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={ref}
          onMouseEnter={onEnter}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className={`relative flex items-center justify-center transition-all duration-200 ease-linear ${className}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
}

type CardItemProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

export function CardItem<T extends ElementType = "div">({
  as,
  children,
  className = "",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  ...rest
}: CardItemProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  const ctx = useContext(MouseEnterContext);
  const entered = ctx?.[0] ?? false;

  const transform = entered
    ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`
    : `translateX(0px) translateY(0px) translateZ(0px)`;

  return (
    <Tag
      className={`w-fit transition duration-200 ease-linear ${className}`}
      style={{ transform }}
      {...rest}
    >
      {children}
    </Tag>
  );
}