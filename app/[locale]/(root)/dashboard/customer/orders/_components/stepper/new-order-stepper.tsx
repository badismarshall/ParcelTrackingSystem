'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { defineStepper } from '@/components/ui/stepper';
import ProductDetails from '../product-details';
import CustomerInformation from '../customer-information';
import DeliveryDetails from '../delivery-details';
import { productDetailsValidation } from '../../_validations/product-details-validation';
import { customerInformationValidation } from '../../_validations/customer-information-validation';
import { deliveryDetailsValidation } from '../../_validations/delivery-details-validation';


// const shippingSchema = z.object({
//   address: z.string().min(1, 'Address is required'),
//   city: z.string().min(1, 'City is required'),
//   postalCode: z.string().min(5, 'Postal code is required'),
// });

// const paymentSchema = z.object({
//   cardNumber: z.string().min(16, 'Card number is required'),
//   expirationDate: z.string().min(5, 'Expiration date is required'),
//   cvv: z.string().min(3, 'CVV is required'),
// });

  // type ShippingFormValues = z.infer<typeof shippingSchema>;
  // type PaymentFormValues = z.infer<typeof paymentSchema>;

const { useStepper, steps, utils } = defineStepper(
  { id: 'product', label: 'Product', schema: productDetailsValidation },
  { id: 'customer', label: 'Customer', schema: customerInformationValidation },
  { id: 'delivery', label: 'Delivery', schema: deliveryDetailsValidation },
  { id: 'complete', label: 'Complete', schema: z.object({}) }
);

function NewOrderStepper() {
  const stepper = useStepper();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(stepper.current.schema),
  });

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
    console.log(`Form values for step ${stepper.current.id}:`, values);
    if (stepper.isLast) {
      stepper.reset();
    } else {
      stepper.next();
    }
  };

  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 border rounded-lg w-full"
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-medium">Checkout</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {currentIndex + 1} of {steps.length}
            </span>
          </div>
        </div>
        <nav aria-label="Checkout Steps" className="group my-4">
          <ol
            className="flex items-center justify-center gap-2"
            aria-orientation="horizontal"
          >
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-2 flex-shrink-0 flex-col lg:px-2">
                  <Button
                    type="button"
                    role="tab"
                    variant={index <= currentIndex ? 'default' : 'secondary'}
                    aria-current={
                      stepper.current.id === step.id ? 'step' : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-8 items-center justify-center rounded-full text-xs"
                    onClick={async () => {
                      const valid = await form.trigger();
                      //must be validated
                      if (!valid) return;
                      //can't skip steps forwards but can go back anywhere if validated
                      if (index - currentIndex > 1) return;
                      stepper.goTo(step.id);
                    }}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium">{step.label}</span>
                </li>
                {index < array.length - 1 && (
                  <Separator
                    className={`flex-1 h-1  mb-4 ${
                      index < currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
        <div className="space-y-4">
          {stepper.switch({
            product: () => <ProductDetails />,
            customer: () => <CustomerInformation />,
            delivery: () => <DeliveryDetails />,
          })}
          {!stepper.isLast ? (
            <div className="flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Back
              </Button>
              <Button type="submit">
                {stepper.isLast ? 'Complete' : 'Next'}
              </Button>
            </div>
          ) : (
            <Button onClick={stepper.reset}>Reset</Button>
          )}
        </div>
      </form>
    </Form>
  );
}


export default NewOrderStepper;

