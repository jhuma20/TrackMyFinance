import { 
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
    } 
from "@/components/ui/sheet";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transactions";
import { AccountForm } from "@/features/accounts/components/account-form";
import { FormValue } from "hono/types";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useGetCategories } from "@/features/catrgories/api/use-get-categories";
import { useCreateCategory } from "@/features/catrgories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { Loader2 } from "lucide-react";


const formSchema  = insertTransactionSchema.omit({
	id: true,
});

type FormValues = z.input<typeof formSchema>;




export const NewTransactionSheet=()=>{
	const {isOpen, onClose} = useNewTransaction();


	const createMutation = useCreateTransaction();

	const categoryQuery = useGetCategories();
	const categoryMutation = useCreateCategory();

	const onCreateCategory = (name: string) => categoryMutation.mutate({
		name
	});
	const categoryOptions = (categoryQuery.data ?? []).map((category)=>({
		label: category.name,
		value: category.id,
	}));

	const accountQuery = useGetAccounts();
	const accountMutation = useCreateAccount();
	
	const onCreateAccount = (name: string) =>  accountMutation.mutate({
		name
	});
	const  accountOptions = (accountQuery.data ?? []).map((account)=>({
		label: account.name,
		value: account.id,
	}));

	const onSubmit = (values: FormValues) =>{
	 console.log("Submitting values:", values);
       createMutation.mutate(values,{
		onSuccess: ()=>{
			onClose();
		},
	   });
	};
const isPending = 
  createMutation.isPending || 
  categoryMutation.isPending ||
  accountMutation.isPending;

const isLoading = 
   categoryQuery.isLoading ||
   accountQuery.isLoading;


  
   return(
	<Sheet open = {isOpen} onOpenChange={onClose}>
		<SheetContent className=" p-6 space-y-4">
			<SheetHeader>
				<SheetTitle >
					New Transaction
				</SheetTitle>
				<SheetDescription>
					Add a new  transactions.
				</SheetDescription>
			</SheetHeader>
			{
				isLoading
				 ? (
                    <div className="absolute insert-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin "/>
					</div>
				 ):
				 (
					 <TransactionForm
			         onSubmit={onSubmit}
			         disabled={isPending}
			         categoryOptions={categoryOptions}
			         onCreateCategory={onCreateCategory}
			         accountOptions={accountOptions}
			         onCreateAccount={onCreateAccount}
			         />
				 )
			}
		</SheetContent>
	</Sheet>
   );
};