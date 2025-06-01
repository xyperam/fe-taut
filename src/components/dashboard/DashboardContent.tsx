"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import DialogProfileSettings from "@/components/dashboard/EditProfile/desktop/settingsProfileDialog";
import EditProfileDialog from "@/components/dashboard/EditProfile/desktop/editProfileDialog";
import { useRouter } from "next/navigation";

export default function DashboardContent() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.global.authLogin.token);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  //hooks profile card
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

  //hooks dialog socmed
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

  //hooks website link
  const {
    isAddLinkDialogOpen,
    openAddLinkDialog,
    closeAddLinkDialog,
    handleSubmit,
    error,
  } = useLinkState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="flex-1 flex justify-center overflow-y-auto bg-[#ebe8e8] mt-4 w-full pb-24">
      <div className="w-full max-w-md md:max-w-2xl space-y-4 p-4">
        <div className="bg-white flex flex-col items-center mx-auto w-full rounded-md shadow-xl">
          <ProfileCard
            profile={profile}
            onEditClick={() => setIsEditOpen(true)}
            onSocmedPicker={openDialog}
            onSettingsClick={() => setIsSettingOpen(true)}
            socialLinks={socialLinks.filter(
              (link) => link.type === "social_media"
            )}
            onEditLinkClick={(link) => {
              const platform = socialPlatforms.find(
                (p) => p.platform.toLowerCase() === link.platform?.toLowerCase()
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

        {isMobile ? (
          <EditProfileDrawer
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            username={profile.displayname || ""}
            bio={profile.bio || ""}
            onSubmit={handleSubmitEdit}
          />
        ) : (
          <EditProfileDialog
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            username={profile.displayname || ""}
            bio={profile.bio || ""}
            onSubmit={handleSubmitEdit}
          />
        )}

        {isMobile ? (
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
        ) : (
          <DialogProfileSettings
            open={isSettingOpen}
            onClose={setIsSettingOpen}
            onEditClick={() => setIsEditOpen(true)}
            onEditPhotoClick={() => setShowCropper(true)}
          />
        )}

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
        {/* dialog socmed */}
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
          open={inputDialogOpen && !isEditMode}
          onChange={(val) => {
            setSocialLink(val);
            if (inputError) setInputError(null);
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
        {/* custom website Card List */}
        <SortableCardList />
      </div>
    </section>
  );
}
