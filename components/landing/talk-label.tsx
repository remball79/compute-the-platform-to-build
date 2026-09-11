export function TalkLabel() {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/talk:-translate-y-full group-focus-visible/talk:-translate-y-full motion-reduce:transform-none motion-reduce:transition-none">
        Let´s Talk
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/talk:translate-y-0 group-focus-visible/talk:translate-y-0 motion-reduce:hidden"
      >
        Let´s Talk
      </span>
    </span>
  );
}
