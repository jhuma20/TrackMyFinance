import { InferRequestType, InferResponseType } from "hono";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";
import {toast} from "sonner";


type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;


export const useDeleteCategory=(id?:string)=>{

	const QueryClient = useQueryClient();


	const mutation = useMutation<
	ResponseType,
	Error
	>({
	 mutationFn: async() =>{
		const response = await client.api.categories[":id"]["$delete"]({
			param: { id }
		});
		return await response.json();
	 },
	 onSuccess: ()=>{
		toast.success("Category deleted");
		QueryClient.invalidateQueries({queryKey: ["category" , {id}]});
		QueryClient.invalidateQueries({queryKey: ["categories"]});
		QueryClient.invalidateQueries({queryKey: ["transactions"]});
		QueryClient.invalidateQueries({queryKey: ["summary"]});
	 },
	 onError: ()=>{
		toast.error("Failed to delete category");
	 },
	});
	return mutation;
};