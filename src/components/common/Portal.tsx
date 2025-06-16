import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  position: {
    top: number;
    left: number;
    width?: number | string;
    height?: number | string;
  };
  children: ReactNode;
  title: string;
}

interface ModalPortalProps {
  children: ReactNode;
  title: string;
}

const Portal = ({ position, children, title }: PortalProps) => {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = title;
    document.body.appendChild(div);
    setEl(div);

    return () => {
      document.body.removeChild(div);
    };
  }, [title]);

  if (!el) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
        zIndex: 999,
      }}
      className={title}
    >
      {children}
    </div>,
    el
  );
};

export const ModalPortal = ({ children, title }: ModalPortalProps) => {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = title;
    document.body.appendChild(div);
    setEl(div);

    return () => {
      if (document.body.contains(div)) {
        document.body.removeChild(div);
      }
    };
  }, [title]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!el) return null;

  return createPortal(children, el);
};

export default Portal;
