import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getUserByClerkId } from "@/actions/user.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";

async function Sidebar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  return (
    <div className="sticky top-20">
      <Card className="rounded-2xl shadow-md border border-gray-200">
        <CardContent className="p-6">
          {/* Profil kısmı */}
          <div className="flex flex-col items-center text-center">
            <Link href={`/profile/${user.username}`} className="flex flex-col items-center group">
              <Avatar className="w-24 h-24 border-4 border-orange-500 shadow-md group-hover:scale-105 transition-transform duration-300">
                <AvatarImage src={user.image || "/avatar.png"} />
              </Avatar>
              <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition">
                {user.name}
              </h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </Link>

            {user.bio && (
              <p className="mt-3 text-sm text-gray-600 italic max-w-[80%]">{user.bio}</p>
            )}
          </div>

          {/* İstatistikler */}
          <div className="mt-6 bg-orange-50 rounded-xl p-4">
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-lg font-bold text-gray-800">{user._count.following}</p>
                <p className="text-xs text-gray-500">Takip</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{user._count.followers}</p>
                <p className="text-xs text-gray-500">Takipçi</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">{user._count.posts}</p>
                <p className="text-xs text-gray-500">Gönderi</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Konum & Website */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="w-4 h-4 mr-2 text-orange-500" />
              {user.location || "Konum eklenmedi"}
            </div>
            <div className="flex items-center text-gray-600">
              <LinkIcon className="w-4 h-4 mr-2 text-orange-500" />
              {user.website ? (
                <a
                  href={`${user.website}`}
                  className="hover:underline truncate text-orange-600"
                  target="_blank"
                >
                  {user.website}
                </a>
              ) : (
                "Website eklenmedi"
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Sidebar;

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card className="rounded-2xl shadow-md border border-gray-200">
      <CardContent className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Tekrar hoş geldin!</h2>
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Profiline erişmek ve başkalarıyla bağlantı kurmak için giriş yap.
        </p>
        <SignInButton mode="modal">
          <Button className="w-full" variant="outline">
            Giriş Yap
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="w-full mt-3 bg-orange-600 hover:bg-orange-500">
            Kayıt Ol
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
);
