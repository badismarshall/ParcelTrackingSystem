"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, ArrowUpRight } from "lucide-react";
import { ChartRadialStacked } from "../_components/chart-radial-stacked";

const MOCK_REWARDS = [
  { id: 1, title: "Commande livrée", points: 50, date: "2024-06-01" },
  { id: 2, title: "Avis laissé", points: 20, date: "2024-05-28" },
  { id: 3, title: "Parrainage réussi", points: 100, date: "2024-05-20" },
];

const TOTAL_POINTS = 320;
const NEXT_REWARD = 500;
const PROGRESS = (TOTAL_POINTS / NEXT_REWARD) * 100;

export default function RewardsPage() {
  return (
    <div className="flex flex-row items-center bg-background py-8 gap-8">
      {/* <Card className="w-full  shadow-lg">
        <CardContent className="py-8 px-6 flex flex-col items-center gap-4"> */}
        <div className="w-full">
          <ChartRadialStacked />
        </div>
        {/* </CardContent>
      </Card> */}
      {/* <Card className="w-full shadow">
        <CardContent className="py-6 px-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-primary" />
            Activité récente
          </h3>
          <ul className="divide-y divide-muted-foreground/10">
            {MOCK_REWARDS.map((reward) => (
              <li key={reward.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-medium">{reward.title}</span>
                  <span className="block text-xs text-muted-foreground">{reward.date}</span>
                </div>
                <span className="font-bold text-primary">+{reward.points} pts</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card> */}
    </div>
  );
}
