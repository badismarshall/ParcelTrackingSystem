'use client'

import { z } from "zod";

import { Input } from "@/components/ui/input";
import { useFormContext } from 'react-hook-form';
import { productDetailsValidation } from '../_validations/product-details-validation';

// Define the type for the form values
type ProductDetailsFormValues = z.infer<typeof productDetailsValidation>;

export default function ProductDetails() {
    const {
        register,
        formState: { errors },
      } = useFormContext<ProductDetailsFormValues>();
    
      return (
        <div className="grid grid-cols-1 xl:grid-cols-3 pt-5 gap-3">
          <div className="space-y-2">
            <label
              htmlFor={register('productName').name}
              className="block text-sm font-medium text-primary"
            >
              Product Name
            </label>
            <Input
              id={register('productName').name}
              {...register('productName')}
              className="block w-full p-2 border rounded-md"
            />
            {errors.productName && (
              <span className="text-sm text-destructive">
                {errors.productName.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor={register('productQuantity').name}
              className="block text-sm font-medium text-primary"
            >
              Product Quantity
            </label>
            <Input
              type="number"
              id={register('productQuantity').name}
              {...register('productQuantity')}
              className="block w-full p-2 border rounded-md"
            />
            {errors.productQuantity && (
              <span className="text-sm text-destructive">
                {errors.productQuantity.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor={register('idExterne').name}
              className="block text-sm font-medium text-primary"
            >
                Product ID Externe
            </label>
            <Input
              id={register('idExterne').name}
              {...register('idExterne')}
              className="block w-full p-2 border rounded-md"
            />
            {errors.idExterne && (
              <span className="text-sm text-destructive">
                {errors.idExterne.message}
              </span>
            )}
          </div> 
        </div>
      );
    
}