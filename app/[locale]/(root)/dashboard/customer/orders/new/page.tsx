import { Card } from "@/components/ui/card"
import NewOrderStepper from "../_components/stepper/new-order-stepper"

function NewOrderPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8">
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Ajouter une commande</h2>
        <p className="text-muted-foreground">
          Nouvelle commande, Nouveau client.
        </p>
      </div>
    </div>
    <Card className="p-4 max-w-6xl mx-auto">
        <NewOrderStepper />
    </Card>
  </div>
  )
}

export default NewOrderPage