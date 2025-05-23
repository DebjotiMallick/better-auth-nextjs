import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
  Tailwind,
  Section,
} from "@react-email/components";

interface VerifyEmailTemplateProps {
  username?: string;
  verifyLink?: string;
}

export const VerifyEmailTemplate = ({
  username,
  verifyLink,
}: VerifyEmailTemplateProps) => {
  const previewText = `Verify your email address`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px] text-center">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Verify your email address
              </Heading>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username || "there"},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for signing up! Please verify your email address by
              clicking the button below:
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={verifyLink}
              >
                Verify Email Address
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Text className="text-black text-[14px] leading-[24px] break-all">
              {verifyLink}
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you didn&apos;t create an account, you can safely ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const reactVerifyEmailTemplate = (props: VerifyEmailTemplateProps) => ({
  react: <VerifyEmailTemplate {...props} />,
});
