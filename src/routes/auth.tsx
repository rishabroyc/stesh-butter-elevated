import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { useAuth } from "@/context/auth";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: (search.redirect as string | undefined) ?? undefined,
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [showPwd, setShowPwd] = useState(false);
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);

  const signInForm = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSignIn(values: z.infer<typeof signInSchema>) {
    try {
      await signIn(values.email, values.password);
      navigate({ to: (redirect ?? "/profile") as "/profile", replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign in failed. Check your credentials.";
      toast.error(message);
    }
  }

  async function onSignUp(values: z.infer<typeof signUpSchema>) {
    try {
      const { needsConfirmation } = await signUp(values.email, values.password, values.name);
      if (needsConfirmation) {
        setAwaitingConfirm(true);
      } else {
        toast.success("Account created! Welcome to Stesh.");
        navigate({ to: (redirect ?? "/profile") as "/profile", replace: true });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign up failed. Please try again.";
      toast.error(message);
    }
  }

  if (awaitingConfirm) {
    return (
      <PageShell>
        <div className="flex min-h-[80vh] items-center justify-center px-4">
          <div className="max-w-sm text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pistachio-light/30 text-pistachio-deep text-2xl">
              ✓
            </div>
            <h1 className="font-display text-4xl">Check your email</h1>
            <p className="mt-4 text-muted-foreground">
              We sent a confirmation link to your inbox. Click it to activate your account, then sign in.
            </p>
            <button
              onClick={() => {
                setAwaitingConfirm(false);
                setTab("signin");
              }}
              className="mt-8 border-b border-pistachio-deep pb-0.5 text-[11px] uppercase tracking-widest-extra text-pistachio-deep"
            >
              Back to sign in →
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <h1 className="text-center font-display text-4xl md:text-5xl">
            {tab === "signin" ? "Welcome back." : "Join Stesh."}
          </h1>
          <p className="mt-3 text-center text-muted-foreground">
            {tab === "signin"
              ? "Sign in to manage your account and subscriptions."
              : "Create an account to Subscribe & Save 15% on every order."}
          </p>

          {/* Tab switcher */}
          <div className="mt-8 flex rounded-full border border-border p-1">
            <button
              onClick={() => setTab("signin")}
              className={`flex-1 rounded-full py-2.5 text-[11px] uppercase tracking-widest-extra transition-all ${
                tab === "signin"
                  ? "bg-pistachio-deep text-cream"
                  : "text-dark/60 hover:text-dark"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 rounded-full py-2.5 text-[11px] uppercase tracking-widest-extra transition-all ${
                tab === "signup"
                  ? "bg-pistachio-deep text-cream"
                  : "text-dark/60 hover:text-dark"
              }`}
            >
              Create Account
            </button>
          </div>

          {tab === "signin" ? (
            <form onSubmit={signInForm.handleSubmit(onSignIn)} className="mt-8 space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  {...signInForm.register("email")}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                  placeholder="you@example.com"
                />
                {signInForm.formState.errors.email && (
                  <p className="mt-1 text-xs text-red-500">{signInForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
                    {...signInForm.register("password")}
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 pr-11 text-sm outline-none transition-colors focus:border-pistachio-deep"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-dark"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {signInForm.formState.errors.password && (
                  <p className="mt-1 text-xs text-red-500">{signInForm.formState.errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={signInForm.formState.isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-pistachio-deep px-8 py-4 text-[11px] uppercase tracking-widest-extra text-cream transition-all hover:bg-dark disabled:opacity-60"
              >
                {signInForm.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign In
              </button>
              <p className="text-center text-sm text-muted-foreground">
                No account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("signup")}
                  className="text-pistachio-deep underline-offset-2 hover:underline"
                >
                  Create one free
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="mt-8 space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  {...signUpForm.register("name")}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                  placeholder="Your name"
                />
                {signUpForm.formState.errors.name && (
                  <p className="mt-1 text-xs text-red-500">{signUpForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  {...signUpForm.register("email")}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-pistachio-deep"
                  placeholder="you@example.com"
                />
                {signUpForm.formState.errors.email && (
                  <p className="mt-1 text-xs text-red-500">{signUpForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-widest-extra text-dark/60">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    autoComplete="new-password"
                    {...signUpForm.register("password")}
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 pr-11 text-sm outline-none transition-colors focus:border-pistachio-deep"
                    placeholder="Min. 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-dark"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {signUpForm.formState.errors.password && (
                  <p className="mt-1 text-xs text-red-500">{signUpForm.formState.errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={signUpForm.formState.isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-pistachio-deep px-8 py-4 text-[11px] uppercase tracking-widest-extra text-cream transition-all hover:bg-dark disabled:opacity-60"
              >
                {signUpForm.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Account
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("signin")}
                  className="text-pistachio-deep underline-offset-2 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
}
