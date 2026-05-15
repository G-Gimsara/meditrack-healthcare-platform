export default function HeroWave() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none leading-[0]">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 text-white"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,20 1440,50 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  )
}
