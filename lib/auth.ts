import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { resend } from "./email/resend";
import { reactResetPasswordEmail } from "./email/reset-password";
import { openAPI } from "better-auth/plugins";

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
  socialProviders: { 
    google: { 
       clientId: process.env.GOOGLE_CLIENT_ID as string, 
       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  }, 
  plugins: [
    openAPI(),
  ]
});
