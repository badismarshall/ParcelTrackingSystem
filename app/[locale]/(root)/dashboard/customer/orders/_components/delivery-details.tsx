import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { deliveryDetailsValidation } from '../_validations/delivery-details-validation';
import { z } from 'zod';

type DeliveryDetailsFormValues = z.infer<typeof deliveryDetailsValidation>;
  
export default function DeliveryDetails() {
  const { register, formState: { errors } } = useFormContext<DeliveryDetailsFormValues>();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="deliveryMethod" className="block text-sm font-medium text-primary">Delivery Method</label>
        <Input id="deliveryMethod" {...register('deliveryMethod')} className="block w-full p-2 border rounded-md" />
        {errors.deliveryMethod && <span className="text-sm text-destructive">{errors.deliveryMethod.message as string}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="deliveryAddress" className="block text-sm font-medium text-primary">Delivery Address</label>
        <Input id="deliveryAddress" {...register('deliveryAddress')} className="block w-full p-2 border rounded-md" />
        {errors.deliveryAddress && <span className="text-sm text-destructive">{errors.deliveryAddress.message as string}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="deliveryPhone" className="block text-sm font-medium text-primary">Delivery Phone</label>
        <Input id="deliveryPhone" {...register('deliveryPhone')} className="block w-full p-2 border rounded-md" />
        {errors.deliveryPhone && <span className="text-sm text-destructive">{errors.deliveryPhone.message as string}</span>}
      </div>
      <div className="space-y-2 flex items-center gap-2">
        <input id="notToDeliver" type="checkbox" {...register('notToDeliver')} className="h-4 w-4" />
        <label htmlFor="notToDeliver" className="text-sm font-medium text-primary">Do not deliver</label>
        {errors.notToDeliver && <span className="text-sm text-destructive">{errors.notToDeliver.message as string}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="totalPrice" className="block text-sm font-medium text-primary">Total Price</label>
        <Input id="totalPrice" type="number" step="0.01" {...register('totalPrice', { valueAsNumber: true })} className="block w-full p-2 border rounded-md" />
        {errors.totalPrice && <span className="text-sm text-destructive">{errors.totalPrice.message as string}</span>}
      </div>
    </div>
  );
}