'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: number
  user: string
  action: string
  resource: string
  timestamp: string
}

const initialActivities: Activity[] = [
  { id: 1, user: "John Doe", action: "Created", resource: "New User", timestamp: "2023-06-10 14:30:00" },
  { id: 2, user: "Jane Smith", action: "Modified", resource: "Role Permissions", timestamp: "2023-06-10 15:45:00" },
  { id: 3, user: "Bob Johnson", action: "Deleted", resource: "Inactive User", timestamp: "2023-06-11 09:15:00" },
  { id: 4, user: "Alice Brown", action: "Viewed", resource: "Audit Logs", timestamp: "2023-06-11 11:00:00" },
  { id: 5, user: "Charlie Davis", action: "Updated", resource: "System Settings", timestamp: "2023-06-12 10:30:00" },
]

export default function Dashboard() {
  const [activities] = useState<Activity[]>(initialActivities)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Track all user activity across the system</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.user}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(activity.action)}>{activity.action}</Badge>
                </TableCell>
                <TableCell>{activity.resource}</TableCell>
                <TableCell>{activity.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function getBadgeVariant(action: string): "default" | "secondary" | "destructive" | "outline" {
  switch (action.toLowerCase()) {
    case 'created':
      return 'default'
    case 'modified':
    case 'updated':
      return 'secondary'
    case 'deleted':
      return 'destructive'
    default:
      return 'outline'
  }
}

