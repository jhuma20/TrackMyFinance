"use client";

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet";
import { NewCategorySheet} from "@/features/catrgories/components/new-category-sheet";
import { EditCategorySheet } from "@/features/catrgories/components/edit-category-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";

// import { useEffect, useState } from "react";
import { useMountedState } from "react-use";

export const SheetProvider=()=>{
	// const [isMounted, setIsMounted] = useState(false);
	// useEffect(()=>{
	// 	setIsMounted(true);
	// },[]);
   const isMounted = useMountedState();
	if(!isMounted) return null;

	return(
		<>
		  <NewAccountSheet/>
		  <EditAccountSheet/>

		  <NewCategorySheet/>
		  <EditCategorySheet/>

		  <NewTransactionSheet/>
		  <EditTransactionSheet/>
		  
		</>
	);
};
