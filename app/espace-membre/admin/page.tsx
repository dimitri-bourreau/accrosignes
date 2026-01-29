"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Title from "@/components/atoms/title";
import Typography from "@/components/atoms/typography";
import Link from "next/link";
import NewsManager from "@/components/molecules/news-manager";
import EventManager from "@/components/molecules/event-manager";
import ResourceManager from "@/components/molecules/resource-manager";
import { UsersTable } from "@/components/molecules/users-table";
import { CreateUserForm } from "@/components/molecules/create-user-form";
import ContentManager from "@/components/molecules/content-manager";

type Tab = "content" | "events" | "resources" | "users" | "news";

export default function AdminDashboard() {
  const { user: currentUser, role, loading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialTab = (): Tab => {
    const param = searchParams.get("tab");
    const validTabs: Tab[] = ["content", "events", "resources", "users", "news"];
    if (param && validTabs.includes(param as Tab)) {
      return param as Tab;
    }
    return "content";
  };

  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`, { scroll: false });
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "content", label: "Contenu", icon: "✏️" },
    { id: "news", label: "Actualités", icon: "📢" },
    { id: "events", label: "Événements", icon: "📅" },
    { id: "resources", label: "Ressources", icon: "📄" },
    { id: "users", label: "Utilisateurs", icon: "👥" },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Typography className="text-gray-600 dark:text-gray-300">
          Vérification des permissions...
        </Typography>
      </main>
    );
  }

  if (role !== "Administrateur") {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Title level="h1" className="text-gray-900 dark:text-gray-100">
            Accès refusé
          </Title>
          <Typography
            variant="body-lg"
            className="text-gray-600 dark:text-gray-300"
          >
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
    <main className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-start mb-12">
          <div>
            <Title level="h1" className="text-gray-900 dark:text-gray-100 mb-2">
              Tableau de bord administrateur
            </Title>
            <Typography
              variant="body-lg"
              className="text-gray-600 dark:text-gray-300"
            >
              Gérez le contenu du site, actualités, événements et ressources
            </Typography>
          </div>
          <button
            onClick={() => signOut()}
            className="cursor-pointer px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
          >
            Déconnexion
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`cursor-pointer px-6 py-3 font-semibold border-b-2 transition duration-200 ${
                activeTab === tab.id
                  ? "border-teal-600 text-teal-600 dark:text-teal-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Title level="h2" className="text-gray-900 dark:text-gray-100">
              {activeTab === "content"
                ? "Gestion du contenu"
                : activeTab === "news"
                  ? "Gestion des actualités"
                  : activeTab === "events"
                    ? "Gestion des événements"
                    : activeTab === "resources"
                      ? "Gestion des ressources"
                      : "Gestion des utilisateurs"}
            </Title>
            {activeTab === "users" && (
              <button
                onClick={() => setShowCreateUserForm(!showCreateUserForm)}
                className="cursor-pointer px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
              >
                {showCreateUserForm ? "Annuler" : "Créer un utilisateur"}
              </button>
            )}
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {activeTab === "news" && currentUser && (
              <NewsManager userId={currentUser.uid} />
            )}

            {activeTab === "content" && currentUser && (
              <ContentManager userId={currentUser.uid} />
            )}

            {activeTab === "events" && currentUser && (
              <EventManager userId={currentUser.uid} />
            )}

            {activeTab === "resources" && currentUser && (
              <ResourceManager userId={currentUser.uid} />
            )}

            {activeTab === "users" && currentUser && (
              <>
                {showCreateUserForm && (
                  <CreateUserForm
                    adminId={currentUser.uid}
                    onSuccess={() => setShowCreateUserForm(false)}
                    onCancel={() => setShowCreateUserForm(false)}
                  />
                )}
                <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                  <UsersTable adminId={currentUser.uid} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
