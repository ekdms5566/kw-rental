import { useEffect } from "react";

export const useTitle = (initialState) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${initialState} | 미디어 대여 서비스`;

    return () => (document.title = prevTitle);
  }, [initialState]);
};
