import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Section,
  Heading,
  Button,
  Text,
  Container,
} from "@react-email/components";
import { getTranslations } from 'next-intl/server';

export async function ResetPasswordEmail({ url }: { url: string }) {
  const t = await getTranslations("auth.reset_password");
  return (
    <Html lang="en">
      <Head />
      <Preview>{t("reset_password_preview")}</Preview>
      <Section style={{
        backgroundColor: "#f4f4f7",
        padding: "40px 0"
      }}>
        <Container style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          maxWidth: "470px",
          margin: "0 auto",
          padding: "36px 28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          fontFamily: "'Segoe UI', Arial, sans-serif"
        }}>
          <Heading
            as="h2"
            style={{
              color: "#18181b",
              fontSize: "26px",
              fontWeight: 700,
              marginBottom: 18,
              marginTop: 0,
              letterSpacing: "-0.6px"
            }}
          >
            {t("title")}
          </Heading>
          <Text style={{
            color: "#333",
            fontSize: "18px",
            margin: "0 0 20px 0"
          }}>
            {t("description")}
          </Text>
          <Section style={{
            textAlign: "center",
            margin: "32px 0"
          }}>
            <Button
              href={url}
              style={{
                backgroundColor: "#6366f1",
                color: "#fff",
                fontWeight: 600,
                padding: "14px 30px",
                borderRadius: "5px",
                fontSize: "17px",
                textDecoration: "none",
                border: "none",
                display: "inline-block",
                cursor: "pointer"
              }}
            >
              {t("title")}
            </Button>
          </Section>
          <Text style={{
            color: "#666",
            fontSize: "15px",
            lineHeight: 1.5,
            margin: "12px 0 0 0"
          }}>
            {t("reset_password_if_not_requested")}
          </Text>
          <Text style={{
            color: "#b0b0b0",
            fontSize: "12px",
            margin: "32px 0 0 0"
          }}>
            &copy; {new Date().getFullYear()} Parcelts. All rights reserved.
          </Text>
        </Container>
      </Section>
    </Html>
  );
}