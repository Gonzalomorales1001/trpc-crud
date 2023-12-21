import { useState } from "react";
import trpc from "./utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppContent from "./AppContent";

const App = () => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:2003/trpc"
        })
      ]
    })
  )


  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
