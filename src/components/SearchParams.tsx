/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const productSearchParamSchema = z.object({
  name: z.string(),
  size: z.enum(["", "small", "medium", "large"]),
});

const SearchParams = ({ name, size, setName, setSize }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {  } = productSearchParamSchema.parse({
    name: searchParams.get("name")?.toLowerCase() ?? "",
    size: searchParams.get("size") ?? "",
  });

  function setParam(paramName: string, paramValue: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    paramValue
      ? newSearchParams.set(paramName, paramValue)
      : newSearchParams.delete(paramName); //if the parameter value is EMPTY_PATH, delete if from the search parameter
    setSearchParams(newSearchParams);
  }

  return (
    <div>
      <h1>Search Params</h1>
      <div>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Size: 
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default SearchParams;

// name,
//     size,
//     setName: (name: string) => setParam("name", name),
//     setSize: (size: string) => setParam("size", size),
