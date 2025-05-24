import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { resend } from "./email/resend";
import { reactResetPasswordEmail } from "./email/reset-password";
import { openAPI, admin, twoFactor, haveIBeenPwned } from "better-auth/plugins";

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
  plugins: [
    openAPI(),
    haveIBeenPwned(),
    twoFactor({
      issuer: process.env.TWO_FACTOR_ISSUER,
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
      adminUserIds: process.env.ADMIN_USER_IDS
        ? JSON.parse(process.env.ADMIN_USER_IDS)
        : [],
    }),
  ],
});
