import Image from "next/image";
import LogoutButton from "../components/logout-button";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { redirect } from "next/navigation";
import logo from "@/app/assets/logo-header.png";
import { Opcoes } from "../components/opcoes/opcoes";

export default async function Home() {

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center h-16 w-full overflow-hidden">
        <div className="flex items-center gap-2 md:gap-5">
          <div className="hidden md:flex bg-white items-center p-2 rounded-md">
            <Image
              src={logo}
              alt="Uniacademia"
              width={120}
              height={120}
              priority
            />
          </div>
          <span className="text-sm md:text-2xl">
            Projeto de Pesquisa em Opções 2024
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Image
            src={session.user?.image || ""}
            alt="Victor Mendonça"
            width={50}
            height={50}
            priority
            className="rounded-full border-2 border-white"
          />
          <span className="hidden md:inline">{session.user?.name}</span>
          <LogoutButton />
        </div>
      </header>
      <main>
        <Opcoes/>
      </main>
    </div>
  );
}
