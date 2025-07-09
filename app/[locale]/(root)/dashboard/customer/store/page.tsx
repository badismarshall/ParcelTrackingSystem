"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const schema = z.object({
  location: z.string().min(2, "La localisation est requise"),
  paymentInfo: z.string().min(4, "Les informations de paiement sont requises"),
});

type FormValues = z.infer<typeof schema>;

const MOCK_STORE = {
  name: "Ma Boutique Géniale",
  location: "123 Rue de Paris, Paris, France",
  paymentInfo: "IBAN FR76 3000 6000 0112 3456 7890 189",
};

export default function StorePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      location: MOCK_STORE.location,
      paymentInfo: MOCK_STORE.paymentInfo,
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
    <div className="flex justify-center items-center min-h-[60vh] bg-background py-8">
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="py-8 px-6">
          <h2 className="text-2xl font-bold mb-2 text-center">Informations de la boutique</h2>
          <p className="text-muted-foreground mb-6 text-center">Gérez les informations de votre boutique</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col gap-2">
                <FormLabel>Nom du magasin</FormLabel>
                <Input value={MOCK_STORE.name} disabled className="bg-muted/50" />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emplacement du magasin</FormLabel>
                    <FormControl>
                      <Input placeholder="Adresse de la boutique" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Informations de paiement</FormLabel>
                    <FormControl>
                      <Input placeholder="IBAN, numéro de compte, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                  Enregistrer
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
