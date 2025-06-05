import { UserRepository } from "@/api/repository/user";
import { RegisterSchema, registerSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState("");
  const userRepository = new UserRepository();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function handleFormSubmit(data: RegisterSchema) {
    if (data.password != isConfirmPassword) {
      setIsError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading("Registering...");

    try {
      const response = await userRepository.create({
        name: data.username,
        email: data.email,
        password: data.password,
      });

      if (!response) {
        toast.error("An unexpected error occurred during registration", {
          id: loadingToastId,
        });
        setIsConfirmPassword("");
        return;
      }

      toast.success("User registered successfully", { id: loadingToastId });
      setTimeout(() => navigate("/"), 0);
    } catch (error) {
      toast.error("Failed to register. try again later", {
        id: loadingToastId,
      });
      console.error("error: ", error);
      console.log(error);
    } finally {
      setIsConfirmPassword("");
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center gap-10">
      <h2 className="font-thin text-2xl">Register</h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col items-center gap-10"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="p-1 pl-2 rounded-md bg-transparent border border-[#A6A6A6] focus-within:border-[#A6A6A6]/60">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="email"
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-transparent outline-none placeholder:opacity-40"
                  />
                )}
              />
            </div>
            {errors.email?.message && (
              <span className="text-error-main text-sm">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="p-1 pl-2 rounded-md bg-transparent border border-[#A6A6A6] focus-within:border-[#A6A6A6]/60">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="username"
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-transparent outline-none placeholder:opacity-40"
                  />
                )}
              />
            </div>
            {errors.username?.message && (
              <span className="text-error-main text-sm">
                {errors.username?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="p-1 pl-2 rounded-md bg-transparent border border-[#A6A6A6] focus-within:border-[#A6A6A6]/60">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="password"
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-transparent outline-none placeholder:opacity-40"
                  />
                )}
              />
            </div>
            {errors.password?.message && (
              <span className="text-error-main text-sm">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="p-1 pl-2 rounded-md bg-transparent border border-[#A6A6A6] focus-within:border-[#A6A6A6]/60">
              <input
                type="text"
                placeholder="confirm password"
                value={isConfirmPassword}
                onChange={(e) => setIsConfirmPassword(e.target.value)}
                className="bg-transparent outline-none placeholder:opacity-40"
              />
            </div>
            {isError && (
              <span className="text-error-main text-sm">{isError}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
          >
            confirm
          </button>
          <button
            disabled={isLoading}
            onClick={() => navigate("/")}
            className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
          >
            back
          </button>
        </div>
      </form>
    </section>
  );
}
