import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 lg:px-24 py-2 bg-cover bg-center object-fill text-rift-grey-900">
      <Image
        src={"/assets/logo.svg"}
        alt="Rift"
        width={120}
        height={120}
        className="mb-10"
      />
      <div className="flex flex-row items-center justify-center gap-5">
        <div className="border-2 border-rift-grey-900 flex-1 flex flex-col">
          <div className="h-8 w-full flex flex-row px-2 py-5 items-end gap-x-4 bg-rift-yellow-2 border-b-2 border-rift-grey-900">
            <Image
              src="/assets/window-icons/hide.svg"
              alt="Minimize"
              width={16}
              height={16}
            />
            <Image
              src="/assets/window-icons/full.svg"
              alt="Maximize"
              width={16}
              height={16}
            />
            <Image
              src="/assets/window-icons/x.svg"
              alt="Close"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col px-5 py-3 bg-rift-yellow-1 gap-y-3 border-b-2 border-rift-grey-900">
            <div className="flex flex-row w-full">
              <p className="font-bold">Send</p>
            </div>
          </div>
          <div className="h-8 w-full flex flex-row bg-rift-yellow-3 border-b-2 border-rift-grey-900"></div>
        </div>
      </div>
    </main>
  );
}
