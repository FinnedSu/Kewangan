import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono"

export const useGetAccout = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],//accouts or account
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({
        param: { id }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch account")
      }

      const { data } = await response.json()
      return data
    }
  })

  return query
}