import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black selection:bg-primary/30">
      <div className="relative">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-20 blur-xl" />
        <SignIn 
          appearance={{
            elements: {
              rootBox: "relative",
              card: "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl",
              headerTitle: "text-white font-bold tracking-tighter text-2xl",
              headerSubtitle: "text-white/40",
              socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest py-3",
              footerActionLink: "text-primary hover:text-primary/80",
              dividerLine: "bg-white/10",
              dividerText: "text-white/20 uppercase text-[10px] font-bold tracking-[0.2em]",
              formFieldLabel: "text-white/60 font-mono text-[10px] uppercase tracking-widest",
              formFieldInput: "bg-white/5 border-white/10 text-white rounded-lg",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-primary",
            }
          }}
        />
      </div>
    </div>
  );
}
