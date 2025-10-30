"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/auth";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const loginSchema = z.object({
  email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

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
    <main className="min-h-screen flex items-center justify-center bg-slate-300 p-4 md:p-none">
      <div className="flex h-[400px] rounded-xl shadow-lg bg-white md:w-auto w-full">
        <div className="md:flex items-center justify-center h-full w-80 hidden ">
          <Image src={"/logo.png"} alt={""} width={250} height={250} />
        </div>
        <div className="md:bg-slate-700 bg-white w-full md:w-80 h-full flex flex-col items-center md:justify-center rounded-xl p-6 gap-4">
          <Image
            src={"/logo-mobile.png"}
            alt={""}
            width={200}
            height={100}
            className="md:hidden block"
          />
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="md:bg-slate-200  p-4 rounded-xl w-full">
              <h1 className="text-2xl font-bold mb-4 text-center text-slate-700">
                Bem vindo
              </h1>
              <div className="mb-4 w-full">
                <Input
                  defaultValue=""
                  type="email"
                  placeholder="E-mail"
                  className="bg-white"
                  {...register("email", { required: true })}
                />
                <span className="text-red-600 -mt-6 text-xs pl-2">
                  {errors?.email?.message}
                </span>
              </div>

              <div className="mb-2 w-full">
                <Input
                  defaultValue=""
                  type="password"
                  placeholder="Senha"
                  className="bg-white"
                  {...register("password", { required: true })}
                />
                <span className="text-red-600 -mt-6 text-xs pl-2">
                  {errors?.password?.message}
                </span>
              </div>
              <Link
                href={"#"}
                className="text-white md:text-slate-700 text-xs pl-1"
              >
                Esqueceu a senha?
              </Link>

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
        </div>
      </div>
    </main>
  );
}
