import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "hooks/auth";

import { useProfie } from "hooks/user";

export default function Profile() {
  const router = useRouter();
  const { isAuth, verifying } = useAuth();
  const { data: profile, error, isLoading } = useProfie();

  useEffect(() => {
    if (!isAuth && !verifying) {
      router.push("/");
    }
  }, [isAuth, verifying, router]);

  if (isLoading || verifying || !isAuth)
    return <div className="h-screen text-3xl layout-center">Loading...</div>;
  if (error)
    return (
      <div className="h-screen layout-center">
        {error?.response?.data || "An error occured"}
      </div>
    );

  return (
    <div className="min-h-[80vh] layout-center">
      <div className="text-4xl">{profile.name}</div>
      <div className="text-4xl">{profile.email}</div>
    </div>
  );
}
