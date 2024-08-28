/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import SearchParams from "./components/SearchParams";

const productSearchParamSchema = z.object({
  name: z.string(),
  size: z.enum(["", "small", "medium", "large"]),
});

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { name, size } = productSearchParamSchema.parse({
    name: searchParams.get("name")?.toLowerCase() ?? "",
    size: searchParams.get("size") ?? "",
  });

  function setParam(paramName: string, paramValue: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    paramValue
      ? newSearchParams.set(paramName, paramValue)
      : newSearchParams.delete(paramName);
    setSearchParams(newSearchParams);
  }

  return (
    <SearchParams
      name={name}
      size={size}
      setName={(name) => setParam("name", name)}
      setSize={(size) => setParam("size", size)}
    />
  );
};

export default App;