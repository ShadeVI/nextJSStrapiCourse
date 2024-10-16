import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/Logo";
import { getUserMeLoader, UserData } from "@/data/services/get-user-me-loader";
import { LogoutButton } from "@/components/custom/LogoutButton";

interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    ctaButton: {
      id: number;
      text: string;
      url: string;
    };
  };
}

export async function Header({ data }: Readonly<HeaderProps>) {
  const { logoText, ctaButton } = data;
  const userResponseData = await getUserMeLoader();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logoText.text} url={logoText.url} />
      <div className="flex items-center gap-4">
        {userResponseData.ok ? (
          <LoggedInUser userData={userResponseData.data!} />
        ) : (
          <Link href={ctaButton.url}>
            <Button>{ctaButton.text}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export function LoggedInUser({ userData }: { readonly userData: UserData }) {
  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard/account"
        className="font-semibold hover:text-primary"
      >
        {userData?.username}
      </Link>
      <LogoutButton />
    </div>
  );
}
