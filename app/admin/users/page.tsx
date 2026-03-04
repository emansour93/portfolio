"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  password: string; // stored hashed
  createdAt: string;
};

export default function UsersCMS() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error(await res.text());
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add new user
  const handleAdd = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) return;
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error(await res.text());
      setNewUser({ name: "", email: "", password: "" });
      setShowAddModal(false);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to add user");
    }
  };

  // Delete user
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error(await res.text());
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
    }
  };

  // Save edited user
  const handleSaveEdit = async (id: number) => {
    try {
      const body: any = {
        id,
        name: editUserData.name,
        email: editUserData.email,
      };
      // send password only if entered
      if (editUserData.password) {
        body.password = editUserData.password;
      }

      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(await res.text());
      setEditUserId(null);
      setEditUserData({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to update user");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users CMS</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={() => setShowAddModal(true)}
        className="px-4 py-2 bg-green-500 text-white rounded mb-4"
      >
        Add User
      </button>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Password</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="odd:bg-white even:bg-gray-100">
                <td className="border px-2 py-1">{user.id}</td>
                <td className="border px-2 py-1">
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={editUserData.name}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          name: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border px-2 py-1">
                  {editUserId === user.id ? (
                    <input
                      type="email"
                      value={editUserData.email}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          email: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border px-2 py-1">
                  {editUserId === user.id ? (
                    <input
                      type="password"
                      placeholder="New Password"
                      value={editUserData.password || ""}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          password: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    "••••••••"
                  )}
                </td>
                <td className="border px-2 py-1 flex gap-2">
                  {editUserId === user.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(user.id)}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditUserId(null)}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditUserId(user.id);
                          setEditUserData({
                            name: user.name,
                            email: user.email,
                            password: "",
                          });
                        }}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
