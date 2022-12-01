import { useState } from "react";

function useUpdate() {
  const [_, setValue] = useState(false)

  return () => setValue(x => !x)
}

export default useUpdate