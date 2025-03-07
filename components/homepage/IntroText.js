export default function IntroText({ children, ...props }) {
  return (
    <div
      {...props}
      className="max-w-[clamp(640px,80vw,1024px)] mx-auto flex flex-col gap-[2rem] lg:py-48 py-24 px-6"
    >
      {children}
    </div>
  );
}
