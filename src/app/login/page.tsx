"use client";
import { useRouter } from "next/navigation";
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
import { useTheme } from "next-themes";
import { saveSession } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ThemeToggle from "@/components/ThemeToggle";
import { LoginForm } from "@/components/layout/login/loginForm";

const loginSchema = z.object({
  email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { theme } = useTheme()
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
      saveSession(res.data.data.accessToken, res.data.data.user);
      router.push("/");
    } catch (err: any) {
      setSubmissionError(err?.response?.data?.message || "Ocorreu um erro inesperado ao fazer login.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-foreground p-4">
      <ThemeToggle />
      <Card className="w-full max-w-sm border bg-background p-6 rounded-md">
        <FormProvider {...methods}>
          <CardHeader className="flex flex-col items-center justify-center h-full">
            <Image src={"/portaria-norender.png"} alt={""} width={100} height={100} />
            <Image
              src={theme === 'dark' ? "/logo-dark.png" : "/logo-light.png"}
              alt={""}
              width={150}
              height={80}
            />
          </CardHeader>
          <CardTitle className="font-semibold text-center text-foreground my-2">
            Faça login na sua conta.
          </CardTitle>
          <CardContent>
            <LoginForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
          </CardContent>
        </FormProvider >
      </Card >
    </main >
  );
}
