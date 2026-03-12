export default function CompassLoading() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-deep-black">
      <div className="flex flex-col items-center gap-6">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        <p className="font-serif text-lg text-cream-muted">
          Loading your compass...
        </p>
      </div>
    </div>
  );
}
