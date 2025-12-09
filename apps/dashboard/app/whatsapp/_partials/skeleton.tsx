import { Skeleton } from "@repo/ui/components/skeleton";

export function WhatsappConnectingSkeleton() {
  return (
    <div className="flex flex-1 items-center justify-center md:p-4">
      <div className="w-full max-w-5xl rounded-xl md:border bg-card text-card-foreground md:shadow-sm">
        <div className="grid gap-6 md:p-6 md:grid-cols-2 lg:p-10">
          {/* Left Side: Instructions Skeleton */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}

              <div className="pt-4">
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>

          {/* Right Side: QR Code Skeleton */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-64 w-64 rounded-lg" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatsappConnectedSkeleton() {
  return (
    <div className="flex items-stretch gap-6 p-4">
      {/* Left Column: Bot Status Skeleton */}
      <div className="w-full md:w-1/3 lg:w-1/4">
        <div className="rounded-2xl border bg-card p-6 shadow-sm h-full">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />

            <div className="flex flex-col items-center text-center space-y-2 w-full">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-6 w-24 rounded-full" />

            <div className="w-full pt-4">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Bot Menu Skeleton */}
      <div className="w-full md:w-2/3 lg:w-3/4">
        <div className="rounded-2xl border bg-card p-6 shadow-sm h-full">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-start p-4 rounded-xl border bg-card">
                <Skeleton className="h-9 w-9 rounded-lg mb-3" />
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
