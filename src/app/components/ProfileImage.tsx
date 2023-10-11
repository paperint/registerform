"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  form: any;
};

const ProfileImage = ({ form }: Props) => {
  const { setValue } = form;
  const [avatar, setAvatar] = useState<string>("");
  const supabase = createClientComponentClient();
  const [isUpload, setIsUpload] = useState<boolean>(false);

  const uploadProfile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUpload(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error(`You must select an image to upload`);
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uuid()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      const result = await downloadProfile(filePath);
      setValue("profile", result);
    } catch (error) {
      console.log("Error from upload profile:", error);
    } finally {
      setIsUpload(false);
    }
  };

  const downloadProfile = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrl(path, 600); // 10 min

      if (error) {
        throw error;
      }

      const url = data.signedUrl;
      setAvatar(url);
      return url;
    } catch (error) {
      console.log("Error from download profile:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const url = avatar.split("?")[0];
      const pic = url.split("/");
      const result = pic[pic.length - 1];
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([result]);
      if (error) {
        throw new Error(`Cannot delete profile image: ${error.message}`);
      }
      setAvatar("");
      setValue("profile", "");
    } catch (error) {
      console.log("Error from delete image:", error);
    }
  };

  return (
    <>
      {avatar == "" ? (
        <FormField
          control={form.control}
          name="profile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <div
                  onClick={() => document.getElementById("profile")?.click()}
                  className="flex items-center justify-center w-32 h-32 bg-orange-300 rounded-lg cursor-pointer"
                >
                  <Input
                    className="hidden"
                    id="profile"
                    type="file"
                    onChange={(event) => {
                      field.onChange(event);
                      uploadProfile(event);
                    }}
                  />
                  {isUpload ? <p>Uploading...</p> : <p>Upload</p>}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <div className="relative w-32 h-32">
          <Image
            src={avatar}
            alt="profile"
            width={128}
            height={128}
            className="object-contain w-32 h-32 rounded-lg"
          />
          <RiDeleteBin2Fill
            className="absolute w-4 h-4 text-orange-300 cursor-pointer top-2 right-2"
            onClick={() => handleDelete()}
          />
        </div>
      )}
    </>
  );
};

export default ProfileImage;
