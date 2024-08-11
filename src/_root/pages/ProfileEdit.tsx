import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { userFormValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import FileUploader from "@/components/shared/FileUploader";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queries";
import Icon from "@mdi/react";
import { mdiAccountEdit, mdiLoading } from "@mdi/js";
import { useAuth } from "@/context/AuthContext";

const ProfileEdit = () => {
  const { checkAuthUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      file: [],
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof userFormValidation>) {
    const newUser = await updateUser({
        id: user?.$id || "",
        name: values.name,
        username: values.username,
        email: values.email,
        bio: values.bio,
        file: values.file,
      });
    if (!newUser) toast({ title: "Something went wrong" });
    await checkAuthUser();
    navigate(`/profile/${user?.$id || ""}`);
  }
  return (
    <div className="card m-6">
        <div className="flex gap-2 items-center text-violet-500">
            <Icon path={mdiAccountEdit} size={1}/>
            <p className="heading">Update User</p>
        </div>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={user?.imageUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-end">
              <Button onClick={() => navigate(-1)} variant="secondary">
                Cancel
              </Button>
              <Button type="submit">
                {isUpdating ? (
                  <>
                    <Icon path={mdiLoading} spin size={1} />
                    Updating
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileEdit;
