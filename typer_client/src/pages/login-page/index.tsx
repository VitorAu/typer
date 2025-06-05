import { UserContext } from "@/api/context/user.context";
import { AuthRepository } from "@/api/repository/auth";
import { UserRepository } from "@/api/repository/user";
import { loginSchema, LoginSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const authRepository = new AuthRepository();
  const userRepository = new UserRepository();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleFormSubmit(data: LoginSchema) {
    setIsLoading(true);
    const loadingToastId = toast.loading("Signing you in...");

    try {
      const response = await authRepository.login(data);

      if (!response) {
        toast.error("An unexpected error occurred during sign-in", {
          id: loadingToastId,
        });
        return;
      }

      const userFetch = await handleFetchUserData(Number(response.userId));
      if (!userFetch) return;

      toast.success("Signed in successfully", { id: loadingToastId });
      setTimeout(() => navigate(`/menu/${response.userId}`), 0);
    } catch (error) {
      toast.error(
        "Failed to sign in. Please check your credentials or try again later",
        { id: loadingToastId }
      );
      console.error("error: ", error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFetchUserData(id: number) {
    try {
      const response = await userRepository.getMe(id);
      if (!response) {
        toast.error("An unexpected error occurred during data fetch");
        return false;
      }

      setUser(response);
      return true;
    } catch (error) {
      toast.error("Failed to fetch user data.");
      console.error(error);
      return false;
    }
  }

  return (
    <section className="flex flex-col items-center gap-10">
      <h2 className="font-thin text-2xl filter brightness-125">Login</h2>
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
            <div className="p-1 pl-2 rounded-md bg-transparent border flex items-center border-[#A6A6A6] focus-within:border-[#A6A6A6]/60">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type={isShowPassword ? "password" : "text"}
                    placeholder="password"
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-transparent outline-none placeholder:opacity-40"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
            {errors.password?.message && (
              <span className="text-error-main text-sm">
                {errors.password?.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
          >
            login
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
