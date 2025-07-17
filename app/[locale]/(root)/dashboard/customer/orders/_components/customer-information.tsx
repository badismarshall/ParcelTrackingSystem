import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { customerInformationValidation } from '../_validations/customer-information-validation';
import { z } from 'zod';

type CustomerInformationFormValues = z.infer<typeof customerInformationValidation>;

export default function CustomerInformation() {
  const { register, formState: { errors } } = useFormContext<CustomerInformationFormValues>();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="customerName" className="block text-sm font-medium text-primary">Customer Name</label>
        <Input id="customerName" {...register('customerName')} className="block w-full p-2 border rounded-md" />
        {errors.customerName && <span className="text-sm text-destructive">{errors.customerName.message as string}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="customerEmail" className="block text-sm font-medium text-primary">Customer Email</label>
        <Input id="customerEmail" {...register('customerEmail')} className="block w-full p-2 border rounded-md" />
        {errors.customerEmail && <span className="text-sm text-destructive">{errors.customerEmail.message as string}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="customerPhone" className="block text-sm font-medium text-primary">Customer Phone</label>
        <Input id="customerPhone" {...register('customerPhone')} className="block w-full p-2 border rounded-md" />
        {errors.customerPhone && <span className="text-sm text-destructive">{errors.customerPhone.message as string}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="city" className="block text-sm font-medium text-primary">City</label>
        <Input id="city" {...register('city')} className="block w-full p-2 border rounded-md" />
        {errors.city && <span className="text-sm text-destructive">{errors.city.message as string}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="Commune" className="block text-sm font-medium text-primary">Commune</label>
        <Input id="Commune" {...register('Commune')} className="block w-full p-2 border rounded-md" />
        {errors.Commune && <span className="text-sm text-destructive">{errors.Commune.message as string}</span>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <label htmlFor="idExterne" className="block text-sm font-medium text-primary">ID Externe</label>
        <Input id="idExterne" {...register('idExterne')} className="block w-full p-2 border rounded-md" />
        {errors.idExterne && <span className="text-sm text-destructive">{errors.idExterne.message as string}</span>}
      </div>
    </div>
  );
}