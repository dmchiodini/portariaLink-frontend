"use client";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/auth";
import api from "@/lib/api";
import { useForm, FormProvider } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { User, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const loginSchema = z.object({
  email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const methods = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await api.post("/auth/login", data);
      saveToken(res.data.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4 md:p-none">
      <ThemeToggle />
      <div className="flex h-[400px] rounded-xl shadow-lg bg-white md:w-auto w-full">
        <div className="md:flex flex-col items-center justify-center h-full w-80 hidden ">
          <Image src={"/condominium.png"} alt={""} width={250} height={250} />
          <Image
            src={"/logo-mobile1.png"}
            alt={""}
            width={200}
            height={100}
            className="-ml-2"
          />
        </div>
        <div className="md:bg-foreground bg-white w-full md:w-80 h-full flex flex-col items-center md:justify-center rounded-xl p-6 gap-4">
          <Image
            src={"/logo-mobile1.png"}
            alt={""}
            width={200}
            height={100}
            className="md:hidden block"
          />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="bg-white p-4 rounded-xl w-full flex flex-col">
                <h1 className="text-2xl font-bold mb-4 text-center text-foreground  dark:text-background">
                  Bem vindo
                </h1>
                <div className="mb-4 w-full">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Digite seu email"
                    icon={User}
                  />
                </div>

                <div className="mb-2 w-full">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Crie sua senha"
                    icon={Lock}
                  />
                </div>

                <div className="mb-2 pl-1">
                  <Link
                    href={"#"}
                    className="dark:text-background text-xs"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <div className="my-3 w-full border-">
                  <Button
                    type="submit"
                    aria-label="Submit"
                    disabled={isSubmitting}
                    variant="default"
                  >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}
