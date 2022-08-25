import { useEffect, useState } from "react";

const useWidth = (item = []) => {
  let items;
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (width > 1400) {
    items = item[0] || 4;
  } else if (width > 1200) {
    items = item[1] || 4;
  } else if (width > 992) {
    items = item[2] || 3;
  } else if (width > 768) {
    items = item[3] || 2;
  } else {
    items = 1;
  }
  return [width, items];
};

export default useWidth;
