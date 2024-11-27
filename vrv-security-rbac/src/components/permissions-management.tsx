'use client'

import { useState } from 'react'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Permission {
  id: number
  name: string
  description: string
}

const initialPermissions: Permission[] = [
  { id: 1, name: 'Read', description: 'Can view content' },
  { id: 2, name: 'Write', description: 'Can create and edit content' },
  { id: 3, name: 'Delete', description: 'Can delete content' },
]

export default function PermissionsManagement() {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions)
  const [newPermission, setNewPermission] = useState<Omit<Permission, 'id'>>({ name: '', description: '' })

  const addPermission = () => {
    setPermissions([...permissions, { ...newPermission, id: permissions.length + 1 }])
    setNewPermission({ name: '', description: '' })
  }

  const deletePermission = (id: number) => {
    setPermissions(permissions.filter(permission => permission.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissions Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <Input
            type="text"
            placeholder="Permission Name"
            value={newPermission.name}
            onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={newPermission.description}
            onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
          />
        </div>
        <Button onClick={addPermission} className="mb-6 w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Permission
        </Button>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map(permission => (
                <TableRow key={permission.id}>
                  <TableCell className="font-medium">{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deletePermission(permission.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

