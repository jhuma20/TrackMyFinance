import { InferRequestType, InferResponseType } from "hono";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";
import {toast} from "sonner";


type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"];

export const useEditTransaction=(id?:string)=>{

	const QueryClient = useQueryClient();


	const mutation = useMutation<
	ResponseType,
	Error,
	RequestType
	>({
	 mutationFn: async(json) =>{
		const response = await client.api.transactions[":id"]["$patch"]({
			param: { id },
			json,
		});
		return await response.json();
	 },
	 onSuccess: ()=>{
		toast.success("Transaction Updated");
		QueryClient.invalidateQueries({queryKey: ["transaction" , {id}]});
		QueryClient.invalidateQueries({queryKey: ["transactions"]});
		QueryClient.invalidateQueries({queryKey: ["summary"]});
	 },
	 onError: ()=>{
		toast.error("Failed to edit transaction.");
	 },
	});
	return mutation;
};