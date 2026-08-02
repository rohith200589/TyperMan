"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "@/components/settings/settings-provider";
import { Keyboard } from "@/components/ui/keyboard";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Keyboard as KeyboardIcon, Cursor } from "@phosphor-icons/react";

export default function Page() {
  const router = useRouter();
  const { showKeyboard, soundEnabled, soundVolume, accent } = useSettings();

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        router.push("/play");
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [router]);

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-col px-6 flex-1 items-center justify-center">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
           className="flex flex-col items-center justify-center text-center max-w-2xl gap-8"
        >
           <div className="flex flex-col items-center gap-6">
              <div className="rounded-3xl bg-foreground/5 p-5 ring-1 ring-foreground/10 shadow-lg">
                <KeyboardIcon size={56} className="text-foreground" weight="duotone" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                  Master Your <span className="text-primary">Typing</span> Skills
                </h1>
                <p className="text-lg text-muted-foreground/80 max-w-[500px] leading-relaxed mx-auto">
                  TyperMan is a minimalistic typing test designed to help you improve your speed, accuracy, and muscle memory. 
                </p>
              </div>
           </div>
           
           <div className="flex flex-col items-center gap-4 mt-4">
              <button
                onClick={() => router.push("/play")}
                className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-10 font-medium text-background transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  <Cursor size={20} weight="bold" />
                  Start Typing
                </span>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground/60 animate-pulse">
                <span>Press any key to begin</span>
              </div>
           </div>
        </motion.div>
      </main>

      <footer
        className={cn(
          "hidden items-center justify-center lg:flex",
          showKeyboard
            ? "flex-col pb-4"
            : "invisible h-0 overflow-hidden border-0"
        )}
      >
        <div className="scale-[0.85]">
          <Keyboard
            enableHaptics
            enableSound={soundEnabled}
            forceActive={soundEnabled && !showKeyboard}
            physicalKeysEnabled={false}
            theme={accent}
            volume={soundVolume}
          />
        </div>
        <p className="text-muted-foreground/40 text-xs">
          Built by{" "}
          <a
            className="text-muted-foreground/60 underline-offset-2 hover:text-foreground hover:underline"
            href=""
            rel="noopener noreferrer"
            target="_blank"
          >
            Rohith Saravanan
          </a>
          . The source code is available on{" "}
          <a
            className="text-muted-foreground/60 underline-offset-2 hover:text-foreground hover:underline"
            href="https://github.com/rohith200589/TyperMan"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
