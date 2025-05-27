"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter as userRouter } from "next/navigation";

import ProfileCard from "@/components/core/profileCard";
import { Button } from "@/components/ui/button";
import { useProfileCardLogic } from "@/hooks/useProfileCardLogic";
import SettingsDrawer from "@/components/core/settingsProfileDrawer";
import EditProfileDrawer from "@/components/core/editProfileDrawer";

import UploadAndCrop from "@/components/core/uploadAndCrop";
import PreviewDialog from "@/components/core/previewDialog";
import DialogSocmedPicker from "@/components/core/dialogSocmedPicker";
import { useDialogSocmedPicker } from "@/hooks/useDialogSocmedPicker";

import DialogSocmedInput from "@/components/core/dialogSocmedInput";
import { socialPlatforms } from "@/lib/socialPlatforms";
import DialogSocmedEdit from "@/components/core/dialogSocmedEditLink";

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
    handleSubmitEdit,
    showCropper,
    setShowCropper,
    previewOpen,
    setPreviewOpen,
    croppedImage,
    handleCropComplete,
    handleBackToCrop,
    handleUploadPicture,
    socialLinks,
  } = useProfileCardLogic();
  const {
    open,
    openDialog,
    closeDialog,
    handleOpenChange,
    selectedPlatform,
    setSelectedPlatform,
    inputDialogOpen,
    setInputDialogOpen,
    socialLink,
    setSocialLink,
    handleBackToSelectPlatform,
    handleInputLink,
    openEditDialog,
    isEditMode,
    setIsEditMode,
    setEditingLinkId,
    handleDeleteLink,
  } = useDialogSocmedPicker();
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
    <main className="flex flex-row min-h-screen bg-blue-950 not-only:overflow-x-hidden">
      <section className="flex-1 flex justify-center bg-blue-950 mt-4">
        <div className="p-2 border border-amber-950 w-full max-w-md">
          <div className="bg-white flex flex-col items-center mx-auto w-full max-w-md">
            <ProfileCard
              profile={profile}
              onEditClick={() => setIsEditOpen(true)}
              onSocmedPicker={() => {
                openDialog();
              }}
              onSettingsClick={() => setIsSettingOpen(true)}
              socialLinks={socialLinks.filter(
                (link) => link.type === "social_media"
              )}
              onEditLinkClick={(link) => {
                const platform = socialPlatforms.find(
                  (p) =>
                    p.platform.toLowerCase() === link.platform?.toLowerCase()
                );
                if (!platform) return;

                openEditDialog(platform, link.url, link.id);
              }}
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
              <UploadAndCrop
                open={true}
                onOpenChange={(open) => setShowCropper(open)}
                onCropComplete={handleCropComplete}
              />
            </div>
          )}
          <PreviewDialog
            open={previewOpen}
            onOpenChange={setPreviewOpen}
            image={croppedImage}
            onBack={handleBackToCrop}
            onUpload={handleUploadPicture}
          />

          <DialogSocmedPicker
            open={open}
            onClose={handleOpenChange}
            onSelect={(platform) => {
              setSelectedPlatform(platform);
              setInputDialogOpen(true);
              closeDialog();
              setIsEditMode(false);
              setEditingLinkId(null);
            }}
          />

          <DialogSocmedInput
            open={inputDialogOpen}
            onChange={setSocialLink}
            onClose={setInputDialogOpen}
            platform={selectedPlatform}
            value={socialLink}
            onBack={handleBackToSelectPlatform}
            onSubmit={handleInputLink}
          />
          <DialogSocmedEdit
            open={inputDialogOpen && isEditMode}
            onClose={setInputDialogOpen}
            platform={selectedPlatform}
            value={socialLink}
            onChange={setSocialLink}
            onBack={handleBackToSelectPlatform}
            onSubmit={handleInputLink}
            onDelete={handleDeleteLink}
          />
        </div>
      </section>
    </main>
  );
}
