import { useRef, type RefObject } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  GalleryLaptopShell,
  useGalleryLaptopScroll,
} from '../../components/GalleryScrollLaptop';

const GALLERY_SLIDES: {
  src: string;
  alt: string;
  label: string;
}[] = [
  {
    src: '/case-studies/insta-kill/insta-kill-gallery-jersey.png',
    alt: 'Insta Kill esports jersey — front and back views with geometric panels and wordmark',
    label: 'Jerseys',
  },
  {
    src: '/case-studies/insta-kill/insta-kill-gallery-monogram.png',
    alt: 'Insta Kill INK monogram — red N over white I with flanking K letterforms',
    label: 'Monogram',
  },
];

export type InstaKillGalleryProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function InstaKillGallery({ scrollContainerRef }: InstaKillGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const n = GALLERY_SLIDES.length;

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ['start start', 'end end'],
    layoutEffect: false,
  });

  const { lidRotateX, slideProgress } = useGalleryLaptopScroll(
    scrollYProgress,
    reduce
  );

  return (
    <section
      className="relative border-t border-white/10 bg-black px-4 pt-20 md:px-8 md:pt-28 lg:px-12"
      aria-label="Project gallery"
    >
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <motion.h2
            className="inline-block font-serif text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl"
            initial={reduce ? false : { opacity: 0, x: -28, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Gallery
          </motion.h2>
          <motion.div
            className="mt-4 h-px max-w-[6rem] origin-left bg-gradient-to-r from-white/50 to-transparent"
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        </motion.div>
      </div>

      <div
        ref={sectionRef}
        className="relative w-full bg-black"
        style={{ height: `${n * 100}vh` }}
      >
        <div className="sticky top-24 z-10 flex min-h-[calc(100svh-6rem)] flex-col overflow-visible bg-black px-4 md:top-28 md:min-h-[calc(100svh-7rem)] md:px-6">
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={reduce ? undefined : { y: -6, scale: 1.01 }}
              className="flex w-full justify-center"
            >
              <GalleryLaptopShell
                lidRotateX={lidRotateX}
                prefersReducedMotion={reduce}
              >
                {GALLERY_SLIDES.map((image, index) => {
                  const segmentSize = 1 / n;
                  const start = index * segmentSize;
                  const fadeIn = start;
                  const fullVisible = start + segmentSize * 0.15;
                  const fadeOutStart = start + segmentSize * 0.85;
                  const end = start + segmentSize;
                  return (
                    <ScreenImage
                      key={`${image.src}-${index}`}
                      src={image.src}
                      label={image.alt}
                      slideProgress={slideProgress}
                      fadeIn={fadeIn}
                      fullVisible={fullVisible}
                      fadeOutStart={fadeOutStart}
                      end={end}
                      isFirst={index === 0}
                      isLast={index === n - 1}
                    />
                  );
                })}
              </GalleryLaptopShell>
            </motion.div>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-2 pb-6 pt-2 md:gap-3 md:pb-8">
            {GALLERY_SLIDES.map((image, index) => (
              <PageDot
                key={`${image.label}-${index}`}
                index={index}
                label={image.label}
                slideProgress={slideProgress}
                total={n}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScreenImage({
  src,
  label,
  slideProgress,
  fadeIn,
  fullVisible,
  fadeOutStart,
  end,
  isFirst,
  isLast,
}: {
  src: string;
  label: string;
  slideProgress: MotionValue<number>;
  fadeIn: number;
  fullVisible: number;
  fadeOutStart: number;
  end: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const eps = 1e-5;
  const opacity = useTransform(
    slideProgress,
    isLast
      ? [fadeIn, fullVisible, 1]
      : isFirst
        ? [0, Math.max(eps, fadeIn + eps), fadeOutStart, end]
        : [fadeIn, fullVisible, fadeOutStart, end],
    isLast ? [0, 1, 1] : isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center p-[1px]"
    >
      <img
        src={src}
        alt={label}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}

function PageDot({
  index,
  label,
  slideProgress,
  total,
}: {
  index: number;
  label: string;
  slideProgress: MotionValue<number>;
  total: number;
}) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;
  const dotOpacity = useTransform(
    slideProgress,
    [start, start + segmentSize * 0.1, end - segmentSize * 0.1, end],
    index === 0
      ? [1, 1, 1, 0.3]
      : index === total - 1
        ? [0.3, 1, 1, 1]
        : [0.3, 1, 1, 0.3]
  );
  const dotScale = useTransform(
    slideProgress,
    [start, start + segmentSize * 0.1, end - segmentSize * 0.1, end],
    index === 0
      ? [1.5, 1.5, 1.5, 1]
      : index === total - 1
        ? [1, 1.5, 1.5, 1.5]
        : [1, 1.5, 1.5, 1]
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        style={{ opacity: dotOpacity, scale: dotScale }}
        className="h-2 w-2 rounded-full bg-white"
      />
      <motion.span
        style={{ opacity: dotOpacity }}
        className="hidden max-w-[4.5rem] text-center text-[9px] uppercase leading-tight tracking-widest text-white md:block md:text-[10px]"
      >
        {label}
      </motion.span>
    </div>
  );
}
