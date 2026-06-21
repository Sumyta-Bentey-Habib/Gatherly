import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await apiFetch("/api/admin/users");
      if (Array.isArray(data)) setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      // Fallback mock users
      setUsers([
        { id: "1", name: "Alice", email: "alice@example.com", role: "admin" },
        { id: "2", name: "Bob", email: "bob@example.com", role: "user" },
      ]);
    }
  };

  const updateUserRole = async (id: string, role: string) => {
    try {
      await apiFetch(`/api/admin/users/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role })
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, updateUserRole, refreshUsers: fetchUsers };
}
