import type { Metadata } from "next";
import "./globals.css";
import { League_Spartan } from "next/font/google";
import { classJoin } from "@/utils/general";
import { cookies } from "next/headers";
import {
  DARK_THEME_CLASS_NAME,
  IS_DARK_THEME_COOKIE_NAME,
} from "@/constants/general";
import "dotenv/config";
import { StoreProvider } from "@/providers/StoreProvider";
import { GlobalToast } from "@/components/toast";
import HolyLoader from "holy-loader";
import { Header } from "@/components/header";
import { getJwt, getUser } from "@/server-helpers";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Invoice App",
    default: "Invoice App",
  },
  description: "A web application to manage your invoices",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isDarkTheme =
    cookieStore.get(IS_DARK_THEME_COOKIE_NAME)?.value === "true";
  const jwt = await getJwt(cookieStore);
  const user = await getUser(jwt);

  return (
    <html
      lang="en"
      className={classJoin(
        leagueSpartan.className,
        isDarkTheme && DARK_THEME_CLASS_NAME,
        "h-full overflow-auto"
      )}
    >
      <body
        className={classJoin(
          "antialiased",
          "font-league-spartan",
          "h-full",
          "bg-ds-11 dark:bg-ds-12",
          "text-black dark:text-white",
          "flex flex-col",
          "isolate"
        )}
      >
        <HolyLoader color="#3B82F6" zIndex={50} />
        <StoreProvider initialIsDarkTheme={isDarkTheme} initialUser={user}>
          <Header />
          <div className={classJoin("grow overflow-y-auto", "bg-inherit")}>
            {children}
          </div>
          <GlobalToast />
        </StoreProvider>
      </body>
    </html>
  );
}
