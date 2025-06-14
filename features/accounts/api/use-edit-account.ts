import { InferRequestType, InferResponseType } from "hono";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";
import {toast} from "sonner";


type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];

export const useEditAccount=(id?:string)=>{

	const QueryClient = useQueryClient();


	const mutation = useMutation<
	ResponseType,
	Error,
	RequestType
	>({
	 mutationFn: async(json) =>{
		const response = await client.api.accounts[":id"]["$patch"]({
			param: { id },
			json,
		});
		return await response.json();
	 },
	 onSuccess: ()=>{
		toast.success("Account Updated");
		QueryClient.invalidateQueries({queryKey: ["accounts" , {id}]});
		QueryClient.invalidateQueries({queryKey: ["accounts"]});
		QueryClient.invalidateQueries({queryKey:["transactions"]});
		QueryClient.invalidateQueries({queryKey:["summary"]});
	 },
	 onError: ()=>{
		toast.error("Failed to edit account");
	 },
	});
	return mutation;
};