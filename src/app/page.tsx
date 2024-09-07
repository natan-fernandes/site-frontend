import logo from "@/app/assets/logo.png";
import background from "@/app/assets/background.webp";
import Image from "next/image";
import SigninButton from "./components/signin-button";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/home");
  }

  return (
    <main className="relative flex flex-col justify-center items-center gap-5 h-screen">
      <div className="absolute inset-0">
        <Image
          src={background}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-95"></div>
      </div>

      <div className="relative z-10 text-center flex flex-col justify-center items-center gap-5">
        <div className="bg-white p-2 rounded-md">
          <Image
            src={logo}
            alt="Uniacademia"
            width={200}
            height={200}
            priority
          />
        </div>
        <h1 className="text-3xl text-center text-white">
          Projeto de Pesquisa em <span className="font-bold">Opções</span> 2024
        </h1>
        <SigninButton />
      </div>
    </main>
  );
}
