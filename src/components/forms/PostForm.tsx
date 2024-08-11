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
import { postFormValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import FileUploader from "@/components/shared/FileUploader";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { Models } from "appwrite";

type postProps = {
  post?: Models.Document;
  action: "Update" | "Create";
};
const PostForm = ({ post, action }: postProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost();

  const form = useForm<z.infer<typeof postFormValidation>>({
    resolver: zodResolver(postFormValidation),
    defaultValues: {
      caption: post?.caption || "",
      file: [],
      location: post?.location || "",
      tags: post?.tags.join(",") || "",
      userId: user.id,
    },
  });

  async function onSubmit(values: z.infer<typeof postFormValidation>) {
    if (action === "Create") {
      const newPost = await createPost(values);
      if (!newPost) {
        toast({ title: "Failed to create post" });
        return;
      }
      navigate("/");
    } else if (action === "Update") {
      const updateNewPost = await updatePost({
        $id: post?.$id || "",
        caption: values.caption,
        location: values.location,
        tags: values.tags,
        file: values.file || [],
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });
      if (!updateNewPost) {
        toast({ title: "Failed to update post" });
        return;
      }
      navigate(`/posts/${post?.$id}`);
    }
  }
  return (
    <div className="">
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={post?.imageUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>tags ( separate by comma "," )</FormLabel>
                  <FormControl>
                    <Input {...field} className="input" />
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
                {isCreating || isUpdating ? (
                  <>
                    <Icon path={mdiLoading} spin size={1} />
                    Submitting
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostForm;
