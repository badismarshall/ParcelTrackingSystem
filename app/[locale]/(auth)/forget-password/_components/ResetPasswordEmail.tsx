import * as React from 'react';
import { Html, Button } from "@react-email/components";

export function ResetPasswordEmail(props: any) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Reset Password</Button>
      <p>If you did not request a password reset, please ignore this email.</p>
    </Html>
  );
}