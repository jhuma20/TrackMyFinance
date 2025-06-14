import { InferRequestType, InferResponseType } from "hono";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";
import {toast} from "sonner";


type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;


export const useDeleteAccount=(id?:string)=>{

	const QueryClient = useQueryClient();


	const mutation = useMutation<
	ResponseType,
	Error
	>({
	 mutationFn: async() =>{
		const response = await client.api.accounts[":id"]["$delete"]({
			param: { id }
		});
		return await response.json();
	 },
	 onSuccess: ()=>{
		toast.success("Account deleted");
		QueryClient.invalidateQueries({queryKey: ["accounts" , {id}]});
		QueryClient.invalidateQueries({queryKey: ["accounts"]});
		QueryClient.invalidateQueries({queryKey: ["transactions"]});
		QueryClient.invalidateQueries({queryKey: ["summary"]});
	 },
	 onError: ()=>{
		toast.error("Failed to delete account");
	 },
	});
	return mutation;
};