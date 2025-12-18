"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Title from "@/components/title";
import Typography from "@/components/typography";
import Link from "next/link";

type Tab = "content" | "articles" | "events" | "resources" | "users";

interface User {
  uid: string;
  email: string;
  role: "Administrateur" | "Élève" | null;
}

export default function AdminDashboard() {
  const { user: currentUser, role, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [showAddForm, setShowAddForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "content", label: "Contenu", icon: "✏️" },
    { id: "articles", label: "Articles", icon: "📰" },
    { id: "events", label: "Événements", icon: "📅" },
    { id: "resources", label: "Ressources", icon: "📄" },
    { id: "users", label: "Utilisateurs", icon: "👥" },
  ];

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  const handleSetRole = async (uid: string, newRole: "Administrateur" | "Élève") => {
    if (!currentUser) return;
    try {
      const response = await fetch("/api/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid,
          role: newRole,
          adminId: currentUser.uid,
        }),
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error setting role:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Typography className="text-gray-600">
          Vérification des permissions...
        </Typography>
      </main>
    );
  }

  if (role !== "Administrateur") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Title level="h1" className="text-gray-900">
            Accès refusé
          </Title>
          <Typography variant="body-lg" className="text-gray-600">
            Vous n&apos;avez pas les permissions pour accéder à cette page.
          </Typography>
          <Link
            href="/espace-membre"
            className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
          >
            Retour à l&apos;espace membres
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-start mb-12">
          <div>
            <Title level="h1" className="text-gray-900 mb-2">
              Tableau de bord administrateur
            </Title>
            <Typography variant="body-lg" className="text-gray-600">
              Gérez le contenu du site, articles, événements et ressources
            </Typography>
          </div>
          <button
            onClick={() => signOut()}
            className="cursor-pointer px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-200"
          >
            Déconnexion
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer px-6 py-3 font-semibold border-b-2 transition duration-200 ${
                activeTab === tab.id
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Title level="h2" className="text-gray-900">
              {activeTab === "content"
                ? "Gestion du contenu"
                : activeTab === "articles"
                ? "Gestion des articles"
                : activeTab === "events"
                ? "Gestion des événements"
                : activeTab === "resources"
                ? "Gestion des ressources"
                : "Gestion des utilisateurs"}
            </Title>
            {activeTab !== "users" && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="cursor-pointer px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
              >
                {showAddForm ? "Annuler" : "Ajouter nouveau"}
              </button>
            )}
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
              {activeTab === "content" && (
                <>
                  <input
                    type="text"
                    placeholder="Identifiant unique (ex: hero-title)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Contenu (texte ou HTML)"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Section/Page (ex: accueil, à-propos)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </>
              )}

              {activeTab === "articles" && (
                <>
                  <input
                    type="text"
                    placeholder="Titre de l'article"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Résumé/Extrait"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Contenu complet"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <input
                    type="file"
                    placeholder="Image de couverture"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </>
              )}

              {activeTab === "events" && (
                <>
                  <input
                    type="text"
                    placeholder="Titre de l'événement"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </>
              )}

              {activeTab === "resources" && (
                <>
                  <input
                    type="text"
                    placeholder="Titre de la ressource"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>Sélectionner une catégorie</option>
                    <option>Initiation</option>
                    <option>Niveau 1</option>
                    <option>Niveau 2</option>
                  </select>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </>
              )}

              <button className="cursor-pointer w-full px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200">
                Créer
              </button>
            </div>
          )}

          {/* Items List */}
          <div className="space-y-3">
            {activeTab === "content" && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
                <div>
                  <Typography className="font-semibold text-gray-900">
                    Aucun contenu pour le moment
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    Ajoutez votre premier bloc de contenu
                  </Typography>
                </div>
              </div>
            )}

            {activeTab === "articles" && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
                <div>
                  <Typography className="font-semibold text-gray-900">
                    Aucun article pour le moment
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    Ajoutez votre premier article
                  </Typography>
                </div>
              </div>
            )}

            {activeTab === "events" && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
                <div>
                  <Typography className="font-semibold text-gray-900">
                    Aucun événement pour le moment
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    Ajoutez votre premier événement
                  </Typography>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
                <div>
                  <Typography className="font-semibold text-gray-900">
                    Aucune ressource pour le moment
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    Ajoutez votre première ressource
                  </Typography>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                {usersLoading ? (
                  <div className="p-8 text-center">
                    <Typography className="text-gray-600">Chargement des utilisateurs...</Typography>
                  </div>
                ) : users.length === 0 ? (
                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div>
                      <Typography className="font-semibold text-gray-900">
                        Aucun utilisateur
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rôle</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.uid} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-3 text-sm text-gray-900">{user.email}</td>
                          <td className="px-6 py-3 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === "Administrateur"
                                ? "bg-blue-100 text-blue-800"
                                : user.role === "Élève"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {user.role || "Sans rôle"}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-sm">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-gray-700 w-10">Admin</span>
                              <button
                                onClick={() => handleSetRole(user.uid, user.role === "Administrateur" ? "Élève" : "Administrateur")}
                                className="cursor-pointer relative inline-flex items-center justify-center h-6 w-12 rounded-full transition-colors duration-200"
                                style={{
                                  backgroundColor: user.role === "Administrateur" ? "#2563eb" : "#16a34a",
                                }}
                              >
                                <div
                                  className="h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300"
                                  style={{
                                    transform: user.role === "Administrateur" ? "translateX(-6px)" : "translateX(6px)",
                                  }}
                                />
                              </button>
                              <span className="text-xs font-semibold text-gray-700 w-10">Élève</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
