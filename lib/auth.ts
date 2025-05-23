import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { resend } from "./email/resend";
import { reactResetPasswordEmail } from "./email/reset-password";
import { openAPI, admin, oneTap, twoFactor } from "better-auth/plugins";
import { reactVerifyEmailTemplate } from "./email/verify-email";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from: process.env.EMAILS_FROM as string,
        to: user.email,
        subject: "Reset your password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      });
    },
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      const emailTemplate = reactVerifyEmailTemplate({
        username: user.email.split('@')[0],
        verifyLink: url,
      });
      
      await resend.emails.send({
        from: process.env.EMAILS_FROM as string,
        to: user.email,
        subject: "Verify your email address",
        react: emailTemplate.react,
      });
    },
  },
  socialProviders: { 
    google: { 
       clientId: process.env.GOOGLE_CLIENT_ID as string, 
       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  }, 
  plugins: [
    openAPI(),
    oneTap(),
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          await resend.emails.send({
            from: process.env.EMAILS_FROM as string,
            to: user.email,
            subject: "Your OTP",
            html: `Your OTP is ${otp}`,
          });
        },
      },
    }),
    admin({
      adminUserIds: ["jg8WikNU6tl4SQ6f5hfg8XhN6K1eVjSV"],
    }),
  ]
});
