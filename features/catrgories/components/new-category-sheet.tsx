import { 
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
    } 
from "@/components/ui/sheet";
import {useNewCategory} from "@/features/catrgories/hooks/use-new-category";
import { CategoryForm } from "@/features/catrgories/components/category-form";
import { insertCategorieSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateCategory } from "@/features/catrgories/api/use-create-category";


const formSchema  = insertCategorieSchema.pick({
	name: true,
});

type FormValues = z.input<typeof formSchema>;




export const NewCategorySheet=()=>{
	const {isOpen, onClose} = useNewCategory();


	const mutation = useCreateCategory();

	const onSubmit = (values: FormValues) =>{
       mutation.mutate(values,{
		onSuccess: ()=>{
			onClose();
		},
	   });
	};



   return(
	<Sheet open = {isOpen} onOpenChange={onClose}>
		<SheetContent className=" p-6 space-y-4">
			<SheetHeader>
				<SheetTitle>
					New Category
				</SheetTitle>
				<SheetDescription>
					Create a new category to organize your transactions.
				</SheetDescription>
			</SheetHeader>
			<CategoryForm
			 onSubmit={onSubmit}
			 disabled={mutation.isPending}
			 defaultValues={{
				name:"",
			 }}
			 />
		</SheetContent>
	</Sheet>
   );
};