'use client'

import { Button } from "@/components/Button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2, Edit } from "lucide-react"
import { MdMapsHomeWork } from "react-icons/md";

const users = [
  { id: "1", name: "Diego Chiodini", email: "diego@email.com" },
  { id: "2", name: "Maria Silva", email: "maria@email.com" },
  { id: "3", name: "João Souza", email: "joao@email.com" },
]

export default function Moradores() {
  function handleEdit(id: string) {
    console.log("Editar usuário:", id)
    // aqui você pode redirecionar ou abrir um modal
  }

  function handleDelete(id: string) {
    console.log("Excluir usuário:", id)
    // aqui você pode abrir um modal de confirmação
  }

  return (
    <div className="p-2">
      <div className="flex items-center gap-3 mb-10">
        <MdMapsHomeWork size={30} />
        <h1 className="text-3xl font-bold">Moradores</h1>
      </div>
      <div className="w-full flex justify-end mb-2">
        <Button>Novo Morador</Button>
      </div>
      <Card className="bg-white rounded-md p-4 pb-6">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-center w-[120px]">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-b h-10">
                <TableCell className="text-center">{user.name}</TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-3">
                    <button
                      aria-label="Editar"
                      onClick={() => handleEdit(user.id)}
                      className="text-blue-500 hover:text-blue-600 transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      aria-label="Excluir"
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
