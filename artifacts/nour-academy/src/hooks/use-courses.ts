import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image_url: string;
  icon: string;
  category: "adults" | "kids";
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type CourseInput = Omit<Course, "created_at" | "updated_at">;

export function useCourses() {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useCourse(id: string) {
  return useQuery<Course>({
    queryKey: ["courses", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation<Course, Error, CourseInput>({
    mutationFn: async (course) => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("courses")
        .insert({ ...course, created_at: now, updated_at: now })
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation<Course, Error, { id: string; course: Partial<CourseInput> }>({
    mutationFn: async ({ id, course }) => {
      const { data, error } = await supabase
        .from("courses")
        .update({ ...course, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
