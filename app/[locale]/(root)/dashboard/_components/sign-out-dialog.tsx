"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import { authClient } from "@/lib/auth-client";
import { AlertCircle, LogOut } from "lucide-react";
import { useLocale } from "next-intl";
import { redirect } from "next/navigation";
import { useState } from "react";

interface SignOutDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
  }



export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
    const locale = useLocale();
    const [loading, setLoading] = useState(false);


    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onRequest: (ctx: any) => {
                    setLoading(true);
                },
                onResponse: (ctx: any) => {
                    setLoading(false);
                },
            },
        });
        redirect(`/${locale}/sign-in`);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    {/* <DialogTitle>Sign Out</DialogTitle> */}
                    <div className="flex items-center gap-2">
                        <AlertCircle className="size-5 text-amber-500" />
                        <DialogTitle>Sign Out</DialogTitle>
                    </div>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to sign out?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button 
                            variant="outline" 
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={loading}
                        variant="destructive" 
                        onClick={ handleSignOut }
                    >
                        {
                            loading ? 
                            (<Icons.spinner className="h-4 w-4 animate-spin" />) 
                            : (
                            <>
                                <LogOut className="w-4 h-4" />
                                Log out
                            </>
                            )
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}