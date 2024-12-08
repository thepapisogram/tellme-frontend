export default function GetStarted({
  dataRef,
}: {
  dataRef: React.RefObject<HTMLDialogElement>;
}) {
  return (
    <dialog ref={dataRef} className="modal">
      <div className="modal-box bg-zinc-900">
        <h3 className="font-bold text-2xl text-orange-600">Getting Started</h3>
        <div className="my-2">
          <p className="font-bold tracking-wide text-orange-600">
            Using your Profile Link
          </p>
          <p className="text-white opacity-70">
            You can copy your profile link using the &quot;Copy Link&quot;
            button. You can then share this link to friends.
          </p>
        </div>
        <div className="my-2">
          <p className="font-bold tracking-wide text-orange-600">
            Using Social Links
          </p>
          <p className="text-white opacity-70">
            You can share your link directly to social media platforms using the
            social icons
          </p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
