"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter as userRouter } from "next/navigation";

import ProfileCard from "@/components/dashboard/ProfileSection/profileCard";
import { Button } from "@/components/ui/button";
import { useProfileCardLogic } from "@/hooks/useProfileCardLogic";
import SettingsDrawer from "@/components/dashboard/EditProfile/settingsProfileDrawer";
import EditProfileDrawer from "@/components/dashboard/EditProfile/editProfileDrawer";

import PreviewDialog from "@/components/core/upload/previewDialog";
import DialogSocmedPicker from "@/components/dashboard/SocmedLinkManager/dialogSocmedPicker";
import { useDialogSocmedPicker } from "@/hooks/useDialogSocmedPicker";

import DialogSocmedInput from "@/components/dashboard/SocmedLinkManager/dialogSocmedInput";
import { socialPlatforms } from "@/lib/socialPlatforms";
import DialogSocmedEdit from "@/components/dashboard/SocmedLinkManager/dialogSocmedEditLink";
import { useLinkState } from "@/hooks/useDialogLink";
import DialogInputLink from "@/components/dashboard/WebsiteLinkManager/dialogInputLink";
import SortableCardList from "@/components/dashboard/WebsiteLinkManager/sortableCardList";
import UploadAndCrop from "@/components/core/upload/uploadAndCrop";

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
    inputError,
    setInputError,
  } = useDialogSocmedPicker();
  const {
    isAddLinkDialogOpen,
    openAddLinkDialog,
    closeAddLinkDialog,
    handleSubmit,
    error,
  } = useLinkState();

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
    <main className=" w-full bg-white overflow-y-auto ">
      <section className="flex-1 flex justify-center overflow-y-auto bg-[#FBFBFB] mt-4 w-full pb-24">
        <div className="w-full max-w-md space-y-4 p-4">
          <div className="bg-[#E8F9FF] flex flex-col items-center mx-auto w-full max-w-md">
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
          <Button className="w-full h-10 mt-3 mb-3" onClick={openAddLinkDialog}>
            + Tambahkan Link
          </Button>
          <DialogInputLink
            open={isAddLinkDialogOpen}
            onClose={closeAddLinkDialog}
            onSubmit={(data) => handleSubmit(data.title, data.url)}
            error={error}
          />
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
            onChange={(val) => {
              setSocialLink(val);
              if (inputError) setInputError(null); // reset error saat input berubah
            }}
            onClose={setInputDialogOpen}
            platform={selectedPlatform}
            value={socialLink}
            onBack={handleBackToSelectPlatform}
            onSubmit={handleInputLink}
            error={inputError}
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
          <SortableCardList />
        </div>
      </section>
    </main>
  );
}
