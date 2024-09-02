"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { ProfileSchema } from "@/lib/validation";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";
import { toast } from "@/hooks/use-toast";

interface Props {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(isSubmitting);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || "",
      username: parsedUser.username || "",
      portfolioWebsite: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  });

  // Custom onChange handler to remove https:// prefix
  const handlePortfolioWebsiteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    form.setValue("portfolioWebsite", value.replace(/^https?:\/\//, ""));
  };

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true);
    console.log("on submit");

    try {
      // update user
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });

      router.back();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
    return toast({
      title: "Profile Updated",
      description: "You have successfully updated your profile!",
      variant: "default",
    });

    // console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your username"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>Portfolio Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your portfolio URL"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handlePortfolioWebsiteChange(e);
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Where are you from"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself"
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient  mt-7 flex w-fit self-end text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </form>
    </Form>
  );
};
export default Profile;
