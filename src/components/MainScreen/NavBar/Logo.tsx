export default function Logo() {
  return (
    <div className="flex w-[27.521px] flex-col items-center gap-[2px]">
      {/* eslint-disable @next/next/no-img-element */}
      <div className="relative h-[16.513px] w-[5.111px] shrink-0">
        <img
          src="/mainscreen/icons/logo_pin.svg"
          alt=""
          className="absolute left-1/2 top-0 h-[16.513px] w-[4.691px] -translate-x-1/2"
        />
      </div>
      <div className="relative size-[27.521px]">
        <img
          src="/mainscreen/icons/logo_circle_outer.svg"
          alt=""
          className="absolute inset-0 size-full"
        />
        <img
          src="/mainscreen/icons/logo_circle_inner.svg"
          alt=""
          className="absolute left-[1.18px] top-[1.18px] size-[25.162px]"
        />
        <img
          src="/mainscreen/icons/logo_mark.svg"
          alt="K-BIZ"
          className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 h-[15.726px] w-[18.479px]"
        />
      </div>
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
}
