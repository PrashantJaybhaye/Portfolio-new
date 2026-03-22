export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-9999">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <img
          src="/duke.gif"
          alt="Loading..."
          className="max-w-full max-h-full object-contain pointer-events-none"
        />
      </div>
    </div>
  )
}