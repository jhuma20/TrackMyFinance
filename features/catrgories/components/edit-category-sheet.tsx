import { 
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
	} 
from "@/components/ui/sheet";

import { CategoryForm } from "@/features/catrgories/components/category-form";
import { insertCategorieSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenCategory } from "@/features/catrgories/hooks/use-open-category";
import { useGetCategory } from "@/features/catrgories/api/use-get-category";
import { useEditCategory } from "@/features/catrgories/api/use-edit-category";
import { useDeleteCategory } from "@/features/catrgories/api/use-delete-category";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema  = insertCategorieSchema.pick({
	name: true,
});

type FormValues = z.input<typeof formSchema>;




export const EditCategorySheet=()=>{
	const {isOpen, onClose, id } = useOpenCategory();
   
    const [ConfirmDialog , confirm] = useConfirm(
		"Are you sure?",
		"You are about to delete this category"
	);

	const categoryQuery = useGetCategory(id);
	const editMutation = useEditCategory(id);
	const deleteMutation = useDeleteCategory(id);

     
	const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = categoryQuery.isLoading;


	const onSubmit = (values: FormValues) =>{
	   editMutation.mutate(values,{
		onSuccess: ()=>{
			onClose();
		},
	   });
	};

	const onDelete = async()=>{
		const ok = await confirm();

		if(ok){
			deleteMutation.mutate(undefined,{
				onSuccess: ()=>{
					onClose();
				}
			});
		};
	}

const defaultValues = categoryQuery.data ? {
	name: categoryQuery.data.name
}:{
	name:"",
}


   return(
    <>
	 <ConfirmDialog/>
	   	<Sheet open = {isOpen} onOpenChange={onClose}>
		<SheetContent className="space-y-4">
			<SheetHeader>
				<SheetTitle>
					Edit Category
				</SheetTitle>
				<SheetDescription>
					Edit an existing category.
				</SheetDescription>
			</SheetHeader>
			{
				isLoading ? (
					<div className="absolute insert-0 flex items-center justify-center">
						<Loader2 className="size-4 text-muted-foreground animate-spin"/>
					</div>
				)
			:(
                 <CategoryForm
				 id = {id}
			     onSubmit={onSubmit}
			     disabled={isPending}
			     defaultValues={defaultValues}
				 onDelete={onDelete}
			 />
			)}
		</SheetContent>
	</Sheet>
    </>
   );
};