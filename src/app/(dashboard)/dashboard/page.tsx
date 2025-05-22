"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter as userRouter } from "next/navigation";

import ProfileCard from "@/components/core/profileCard";
import { Button } from "@/components/ui/button";
import { useProfileCardLogic } from "@/hooks/useProfileCardLogic";
import SettingsDrawer from "@/components/core/settingsProfileDrawer";
import EditProfileDrawer from "@/components/core/editProfileDrawer";
import SocmedPickerDrawer from "@/components/core/socmedPickDrawer";
import UploadAndCrop from "@/components/core/uploadAndCrop";

export default function Dashboardpage() {
  const router = userRouter();
  const token = useSelector((state: RootState) => state.global.authLogin.token);
  const [loading, setLoading] = useState(true);

  const {
    profile,
    isSettingOpen,
    setIsSettingOpen,
    isEditOpen,
    setIsEditOpen,
    isSocmedOpen,
    setIsSocmedOpen,
    handleSubmitEdit,
    drawerOpen,
    setDrawerOpen,
    showCropper,
    setShowCropper,
  } = useProfileCardLogic();

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [token, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-row min-h-screen  p-1 bg-gray-50 overflow-x-hidden">
      <section className="flex-1 flex justify-center bg-blue-950 ">
        <div className="p-2 border border-amber-950 w-full max-w-md">
          <div className="bg-white w-full flex flex-col items-center">
            <ProfileCard
              profile={profile}
              onEditClick={() => setIsEditOpen(true)}
              onSocmedClick={() => setIsSocmedOpen(true)}
              onSettingsClick={() => setIsSettingOpen(true)}
            />
          </div>
          <Button className="w-full h-10 mt-3 mb-3">Tambahkan Link</Button>
          <EditProfileDrawer
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            username={profile.displayname || ""}
            bio={profile.bio || ""}
            onSubmit={handleSubmitEdit}
          />
          <SocmedPickerDrawer
            open={isSocmedOpen}
            onOpenChange={setIsSocmedOpen}
          />
          {/* Drawer pengaturan (opsional) */}
          <SettingsDrawer
            open={isSettingOpen}
            onOpenChange={setIsSettingOpen}
            onEditClick={() => {
              setIsEditOpen(true);
              setIsSettingOpen(false);
            }}
            onEditPhotoClick={() => {
              setIsSettingOpen(false);
              setShowCropper(true);
            }}
          />

          {showCropper && (
            <div className="mt-4">
              <UploadAndCrop />
              <Button onClick={() => setShowCropper(false)} className="mt-2">
                Selesai
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
