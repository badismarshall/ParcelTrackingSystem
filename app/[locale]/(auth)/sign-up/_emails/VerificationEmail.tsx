import * as React from 'react';
import { Html, Button, Link } from "@react-email/components";

export function VerificationEmail({ url }: { url: string }) {

  return (
    <Html lang="en">
      <Link href={url}>Verify Your Email</Link>
      <p>If you did not request a verification email, please ignore this email.</p>
    </Html>
  );
}