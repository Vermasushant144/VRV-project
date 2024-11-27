'use client'

import { useState } from 'react'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
}

const initialRoles: Role[] = [
  { id: 1, name: 'Admin', description: 'Full access to all features', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'Editor', description: 'Can edit and publish content', permissions: ['Read', 'Write'] },
  { id: 3, name: 'Viewer', description: 'Can only view content', permissions: ['Read'] },
]

const availablePermissions = ['Read', 'Write', 'Delete']

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [newRole, setNewRole] = useState<Omit<Role, 'id'>>({ name: '', description: '', permissions: [] })

  const addRole = () => {
    setRoles([...roles, { ...newRole, id: roles.length + 1 }])
    setNewRole({ name: '', description: '', permissions: [] })
  }

  const deleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id))
  }

  const togglePermission = (permission: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <Input
            type="text"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newUser, name: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={newRole.description}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
          />
          <div>
            <h3 className="mb-2 text-sm font-medium">Permissions</h3>
            <div className="flex flex-wrap gap-4">
              {availablePermissions.map(permission => (
                <div key={permission} className="flex items-center">
                  <Checkbox
                    id={`permission-${permission}`}
                    checked={newRole.permissions.includes(permission)}
                    onCheckedChange={() => togglePermission(permission)}
                  />
                  <label htmlFor={`permission-${permission}`} className="ml-2 text-sm">{permission}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button onClick={addRole} className="mb-6 w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Role
        </Button>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(role => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map(permission => (
                        <span key={permission} className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteRole(role.id)}>
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

