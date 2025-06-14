"use client";
import { Button } from "@/components/ui/button";
import { 
	Card,
	CardHeader,
	CardTitle,
	CardContent,
 } from "@/components/ui/card";
import { useNewCategory } from "@/features/catrgories/hooks/use-new-category";
import { useGetCategories } from "@/features/catrgories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/catrgories/api/use-bulk-delete-categories";
import { Loader2, Plus } from "lucide-react";

import {columns} from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";



const CategoriesPage = () =>{

	const NewCategory =  useNewCategory();
	const deleteCategories = useBulkDeleteCategories();
	const categoriesQuery = useGetCategories();
	const categories = categoriesQuery.data || [];

    const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

    if(categoriesQuery.isLoading){
		return(
			<div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
		       <Card className="border-none drop-shadow-sm">
			     <CardHeader>
                    <Skeleton className="h-8 w-48"/>
			     </CardHeader>
				 <CardContent>
					<div className="h-[500px] w-full flex items-center justify-center">
                      <Loader2 className="size-6 text-slate-300 animate-spin"/>
					</div>
				 </CardContent>
			    </Card>
			</div>
		)
	}
	return(
		<div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
		   <Card className="border-none drop-shadow-sm">
			<CardHeader className="gap-y-2  flex  flex-col  lg:flex-row lg:items-center lg:justify-between">
				<CardTitle className="text-xl line-clamp-1"> 
					Categories page
				</CardTitle>
				<Button onClick={NewCategory.onOpen} size="sm"
				   className="w-full lg:w-auto" >
					<Plus className="size-4 mr-2"/>
					Add new
				</Button>
			</CardHeader>
			<CardContent>
                 <DataTable 
				 filterKey="name"
				 columns={columns} 
				 data={categories}
				 onDelete={(row) =>{
					const ids = row.map((r) => r.original.id);
					deleteCategories.mutate({ids});
				 }}
				 disabled={isDisabled}
				 />
			</CardContent>
		   </Card>
		</div>
	);
};

export default CategoriesPage;