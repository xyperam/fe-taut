"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Define schema
const FormSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  url: z.string().url("Harus berupa URL yang valid"),
});

type FormData = z.infer<typeof FormSchema>;

type Props = {
  open: boolean;
  onSubmit?: (data: FormData) => void;
  onClose: () => void;
  error?: string | null;
};

export default function DialogInputLink({
  open,
  onSubmit,
  onClose,
  error,
}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onSubmit?.(data);
    form.reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose(); // ✅ Hanya panggil saat dialog ditutup
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: Website Portofolio"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
