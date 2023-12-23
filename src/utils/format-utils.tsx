export const formatDesc = (desc: string, params: string[]) => {
  const isPercent: {
    [index: number]: boolean;
  } = {};
  for (let i = 0; i < params.length; i++) {
    if (desc.includes(`{${i}}%`)) {
      isPercent[i] = true;
    }
  }

  let parts = desc.split(/({\d})/g);
  let result: JSX.Element[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.match(/{\d}/g)) {
      const index = Number(part.replace(/{/g, "").replace(/}/g, ""));
      result.push(
        <span key={i} className="text-orange-400">
          {params[index]}
          {isPercent[index] ? "%" : ""}
        </span>,
      );
      if (parts[i + 1]) {
        parts[i + 1] = parts[i + 1].replace(/^%/, "");
      }
    } else {
      result.push(<span key={i}>{part}</span>);
    }
  }

  return result;
};
