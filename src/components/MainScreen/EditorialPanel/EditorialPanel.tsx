const ASSET = "/mainscreen/editorial";

export default function EditorialPanel() {
  return (
    <div
      className="absolute font-satoshi text-white"
      style={{ left: 1717, top: 8, width: 323, height: 1136 }}
    >
      <div
        className="absolute overflow-hidden rounded-[8px] border-2 border-solid border-white"
        style={{ left: 169, top: 0, width: 151, height: 40 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET}/photo_top.jpg`}
          alt=""
          className="pointer-events-none absolute w-full max-w-none"
          style={{ height: "251.67%", left: 0, top: "-39.58%" }}
        />
      </div>

      <div
        className="absolute flex items-center px-[20px] py-[12px] text-[16px] tracking-[-0.16px]"
        style={{ left: 151, top: 56, width: 192, height: 64 }}
      >
        <p className="w-[152px] leading-[20px] whitespace-pre-wrap">
          {"K-pop  "}
          <br />
          Korean popular music
        </p>
      </div>

      <div className="absolute" style={{ left: 0, top: 56, width: 151, height: 143.5 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/photo_1.png`} alt="" className="size-full" />
      </div>

      <div className="absolute" style={{ left: 168, top: 136, width: 152, height: 224 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/photo_2.png`} alt="" className="size-full" />
      </div>

      <div
        className="absolute flex items-center rounded-[8px] p-[7px]"
        style={{ left: 0, top: 211, width: 152 }}
      >
        <p className="w-[138px] text-[16px] leading-[20px] tracking-[-0.16px]">
          100+ idol groups debut in South Korea each year
        </p>
      </div>

      <div
        className="absolute rounded-[8px] border-2 border-solid border-white bg-accent-cyan"
        style={{ left: 0, top: 296, width: 241, height: 64 }}
      />

      <div
        className="absolute flex items-center rounded-[8px] px-[13px] py-[16px]"
        style={{ left: 82, top: 369 }}
      >
        <p className="font-pretendard w-[138px] text-[15px] font-light leading-[16.9px] tracking-[-0.15px]">
          매년 100개 이상의 아이돌 그룹이 한국에 데뷔다
        </p>
      </div>

      <div
        className="absolute overflow-hidden rounded-[8px] border-2 border-solid border-white"
        style={{ left: 252, top: 376, width: 71, height: 64 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET}/photo_3.jpg`}
          alt=""
          className="pointer-events-none absolute w-full max-w-none"
          style={{ height: "199.11%", left: 0, top: "-90.01%" }}
        />
      </div>

      <div className="absolute" style={{ left: -1, top: 376, width: 151.5, height: 384 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/photo_4.png`} alt="" className="size-full rotate-180 scale-y-[-1]" />
      </div>

      <div className="absolute" style={{ left: 169, top: 455, width: 154, height: 64 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/photo_5.png`} alt="" className="size-full" />
      </div>

      <div className="absolute" style={{ left: 169, top: 777, width: 154, height: 303 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/photo_6.png`} alt="" className="size-full" />
      </div>

      <div
        className="absolute overflow-hidden rounded-[8px] border-2 border-solid border-white"
        style={{ left: 0, top: 1016, width: 153, height: 120 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET}/photo_bottom.jpg`}
          alt=""
          className="pointer-events-none size-full object-cover"
        />
      </div>

      <div
        className="absolute rounded-[8px] border-2 border-solid border-white bg-accent-green"
        style={{ left: 165, top: 1096, width: 158, height: 40 }}
      />
      <div
        className="absolute rounded-[8px] border-2 border-solid border-white bg-accent-pink"
        style={{ left: 257, top: 536, width: 66, height: 144 }}
      />
      <div
        className="absolute rounded-[8px] border-2 border-solid border-white bg-accent-purple"
        style={{ left: -1, top: 936, width: 66, height: 63 }}
      />

      <div
        className="absolute flex items-center justify-center px-[8px] py-[22px]"
        style={{ left: 0, top: 787 }}
      >
        <p className="w-[144px] text-[16px] leading-[20px] tracking-[-0.16px]">
          {"K-pop is one of South Korea's most influential cultural exports"}
        </p>
      </div>

      <div
        className="absolute flex items-center justify-center px-[7px] py-[5px]"
        style={{ left: 80, top: 938 }}
      >
        <p className="font-pretendard w-[150px] text-[15px] font-light leading-[16.9px] tracking-[-0.15px]">
          케이팝은 한국에서 가장 영향력 있는 문화 수출품 중 하나입니다
        </p>
      </div>

      <div
        className="absolute flex items-center justify-center px-[3px] py-[14px]"
        style={{ left: 80, top: 697 }}
      >
        <p className="font-pretendard w-[237px] text-[15px] font-light leading-[16.9px] tracking-[-0.15px]">
          서바이벌 쇼는 이제 수십 개국에서 연수생을 모집하여 다국적 그룹을 만듭다
        </p>
      </div>

      <div
        className="absolute flex items-center px-[7px] py-[12px]"
        style={{ left: 75, top: 546 }}
      >
        <p className="w-[159px] text-[16px] leading-[20px] tracking-[-0.16px]">
          Survival shows now recruit trainees from dozens of countries, creating multinational
          groups
        </p>
      </div>

      <div className="absolute" style={{ left: 0, top: 0, width: 153, height: 119.5 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/photo_topleft.svg`} alt="" className="size-full" />
      </div>
    </div>
  );
}
