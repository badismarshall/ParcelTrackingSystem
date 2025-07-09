"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Loader2, Save } from "lucide-react";
import AvatarUploaderCropper from "@/components/ui/avatar-uploader-cropper";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Phone is required"),
  // email is display only
  avatar: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

const MOCK_USER = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1234567890",
  avatar: "https://i.pravatar.cc/150?img=3",
};

export default function EditAccountForm() {
  const [avatarUrl, setAvatarUrl] = useState(MOCK_USER.avatar);
  const [isLoading, setIsLoading] = useState(false);
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: MOCK_USER.name,
      phone: MOCK_USER.phone,
      avatar: undefined,
    },
  });

  function onSubmit(data: FormValues) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show toast or success message here
    }, 1200);
  }

  return (
    <Card className="w-full max-w-xl shadow-lg">
      <CardContent className="py-8 px-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Mon Compte</h2>
        <p className="text-muted-foreground mb-6 text-center">Gérez vos informations personnelles</p>
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative group">
            {/* <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl} alt={form.watch("name") || "Avatar"} />
              <AvatarFallback>{form.watch("name")?.[0] || "U"}</AvatarFallback>
            </Avatar> */}
            <AvatarUploaderCropper defaultImageUrl={avatarUrl} />
            <p className="text-sm text-muted-foreground mt-2">
              Telechargez votre photo de profil
            </p>
            {/* <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute bottom-0 right-0 rounded-full p-2 shadow group-hover:bg-primary group-hover:text-primary-foreground transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-4 h-4" />
            </Button> */}
            {/* <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            /> */}
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <FormLabel>Email</FormLabel>
              <Input value={MOCK_USER.email} disabled className="bg-muted/50" />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre numéro de téléphone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">Changer le mot de passe</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Changer le mot de passe</DialogTitle>
                  </DialogHeader>
                  <ChangePasswordDialogForm />
                  <DialogFooter>
                    {/* The submit button is inside the dialog form */}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button type="submit" disabled={isLoading} className="flex items-center">
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                ) : null}
                <span className="hidden sm:inline">Enregistrer</span>
                <span className="sm:hidden">
                  <Save className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function ChangePasswordDialogForm() {
  const schema = z.object({
    currentPassword: z.string().min(6, "Mot de passe actuel requis"),
    newPassword: z.string().min(8, "Nouveau mot de passe requis"),
    confirmPassword: z.string().min(8, "Confirmation requise"),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(data: z.infer<typeof schema>) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show toast or success message here
    }, 1200);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Mot de passe actuel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Nouveau mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirmer le mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
          Changer le mot de passe
        </Button>
      </form>
    </Form>
  );
} 