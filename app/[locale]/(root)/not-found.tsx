'use client'

import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Floating 404 with glow effect */}
        <div className="relative">
          <div className="text-9xl md:text-[12rem] font-bold text-gradient float-animation pulse-glow select-none">
            404
          </div>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-primary/10 blur-3xl">
            404
          </div>
        </div>

        {/* Main content card */}
        <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-primary/20 shadow-xl">
          <div className="space-y-6">
            {/* Alert icon with animation */}
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center float-animation">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>

            {/* Title and description */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Page non trouvée
              </h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
                La page que vous cherchez n'existe pas. Elle a peut-être été déplacée, supprimée ou vous avez entré une URL incorrecte.
              </p>

            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="group">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Retour à l'accueil
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="group" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour
              </Button>
            </div>
          </div>
        </Card>

        {/* Decorative elements */}
        {/* <div className="flex justify-center space-x-2 opacity-50">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};
