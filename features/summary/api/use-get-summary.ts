import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { converAmountFromMiliunits } from "@/lib/utils";
import { client } from "@/lib/hono";

export const useGetSummary = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";

    const query = useQuery({
        queryKey: ["summary", { from, to, accountId }],
        queryFn: async () => {
            const response = await client.api.summary.$get({
                query: {
                    from,
                    to,
                    accountId,
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch summary.");
            }

            const { data } = await response.json();
            return {
                ...data,
                incomeAccount: converAmountFromMiliunits(data.incomeAccount),
                expensesAmount: converAmountFromMiliunits(data.expensesAmount),
                remainingAmount: converAmountFromMiliunits(data.remainingAmount), // Changed semicolon to comma
                categories: data.categories.map((category) => ({
                    ...category,
                    value: converAmountFromMiliunits(category.value), // Added category.value to convert
                })),
                days: data.days.map((day) => ({
                    ...day,
                    income: converAmountFromMiliunits(day.income), // Corrected the property name
                    expenses: converAmountFromMiliunits(day.expenses),
                }))
            };
        },
    });

    return query;
};
