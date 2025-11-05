"use client";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/auth";
import api from "@/lib/api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
  email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const methods = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { handleSubmit, formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: LoginData) => {
    setSubmissionError(null);
    try {
      const res = await api.post("/auth/login", data);
      saveToken(res.data.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setSubmissionError(err?.response?.data?.message || "Ocorreu um erro inesperado ao fazer login.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-300 p-4 md:p-none">
      <div className="flex h-[400px] rounded-xl shadow-lg bg-white md:w-auto w-full">
        <div className="md:flex flex-col items-center justify-center h-full w-80 hidden ">
          <Image src={"/condominium.png"} alt={""} width={250} height={250} />
          <Image
            src={"/logo-light.png"}
            alt={""}
            width={200}
            height={100}
          />
        </div>
        <div className="bg-slate-700 w-full md:w-80 h-full flex flex-col items-center md:justify-center rounded-xl p-4 gap-4">
          <Image
            src={"/logo-dark.png"}
            alt={""}
            width={200}
            height={100}
            className="md:hidden block"
          />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="md:bg-slate-200  p-4 rounded-xl w-full">
                <h1 className="text-2xl font-bold mb-4 text-center text-slate-200">
                  Bem vindo
                </h1>
                <div className="mb-4 w-full">
                  <Input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    icon={Mail}
                  />
                </div>
                <div className="mb-2 w-full">
                  <Input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    icon={LockKeyhole}
                  />
                </div>
                <div className="mb-6 pl-1">
                  <Link
                    href={"#"}
                    className="text-xs text-foreground md:text-background"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-600/90 my-4"
                  aria-label="Submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}
