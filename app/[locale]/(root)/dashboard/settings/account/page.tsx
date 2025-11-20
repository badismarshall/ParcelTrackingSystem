import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { SessionManagement } from "./_components/sessions-manager";


export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (session == null) return redirect("/auth/login")

  const sessions = await auth.api.listSessions({
    headers: await headers()
  });

  return (
    <div className="space-y-6 w-full">
      {session && session.user ? (
        <>
          {/* Active Sessions Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                Manage your active sessions across different devices and locations
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <SessionManagement 
                sessions={sessions} 
                currentSessionToken={session.session.token}
              />
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-3 rounded-full bg-destructive/10 mb-4">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <p className="font-semibold text-lg mb-1">No user session found</p>
              <p className="text-sm text-muted-foreground">
                Please log in to view your account information
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
