"use client";

import { ArrowLeft, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotFoundImage from "@/../public/not-found-image.png";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="space-y-6">
        {NotFoundImage ? (
          <Image
            src={NotFoundImage}
            alt="Not found image"
            height={400}
            width={267}
            className="w-full"
          />
        ) : (
          <h1 className="text-8xl font-bold tracking-tighter text-foreground/90">
            404
          </h1>
        )}

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Page not found
          </h2>
          <p className="max-w-100 mx-auto text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-6 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>

          <Button asChild className="gap-2 w-full sm:w-auto">
            <Link href="/">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
