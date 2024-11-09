import { styled } from "@linaria/react";
import { useEffect, useState } from "react";
import { Swiper } from "swiper";
import { Drawer } from "vaul";

import instructions1 from "@/assets/images/instructions-1.png";
import instructions2 from "@/assets/images/instructions-2.png";
import instructions3 from "@/assets/images/instructions-3.png";
import Button from "@/components/button";
import Text from "@/components/text";
import { border, borderRadius, colors, type } from "@/styles/core";
import { Row, Center } from "@/styles/layout";

const DragHandle = styled.div`
  width: 125px;
  height: 9px;
  margin-bottom: 24px;
  border: ${border.thinWhite};
  border-radius: ${borderRadius.round};
`;

const TitleRow = styled(Row)`
  margin-bottom: 24px;
`;

const Title = styled(Drawer.Title)`
  ${type.headline2}
`;

const getBackgroundImage = (image: string) => `url(${image})`;
const InstructionsImage = styled.div<{ image: string }>`
  height: 200px;
  margin: 0 32px 24px;
  background: ${(props) => getBackgroundImage(props.image)} no-repeat center;
  background-size: contain;
`;

const Instruction = styled.div`
  ${type.body}
  margin: 0 12px;
  text-align: center;
`;

const NextButtonContainer = styled.div`
  padding-top: 12px;
`;

function InstructionsCarousel({
  slide,
  onSlideChange,
}: {
  slide: number;
  onSlideChange: (index: number) => void;
}) {
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  useEffect(() => {
    const swiper = new Swiper(".swiper");
    swiper.on("slideChange", () => onSlideChange(swiper.activeIndex));
    setSwiper(swiper);

    return () => {
      swiper?.destroy();
    };
  }, [onSlideChange]);

  useEffect(() => {
    swiper?.slideTo(slide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide" data-vaul-no-drag>
          <InstructionsImage image={instructions1} data-vaul-no-drag />
          <Instruction data-vaul-no-drag>
            Add tiles to the grid by tapping on an empty space.
          </Instruction>
        </div>
        <div className="swiper-slide" data-vaul-no-drag>
          <InstructionsImage image={instructions2} data-vaul-no-drag />
          <Instruction data-vaul-no-drag>
            Tap tiles to spell words. You can go any direction and even change
            directions. Diagonals are not allowed.
          </Instruction>
        </div>
        <div className="swiper-slide" data-vaul-no-drag>
          <InstructionsImage image={instructions3} data-vaul-no-drag />
          <Instruction data-vaul-no-drag>
            Once you spell a word, the tiles will disappear. You get a bonus for
            spelling longer words, so try to make the most of your tiles!
          </Instruction>
        </div>
      </div>
    </div>
  );
}

const DrawerContent = styled(Drawer.Content)`
  position: fixed;
  bottom: 0;
  left: max(calc(50% - 250px), 0px);
  width: 100%;
  max-width: 500px;
  padding: 16px 24px max(env(safe-area-inset-bottom), 12px);
  color: ${colors.white};
  background: ${colors.black};
  border-radius: ${borderRadius.medium} ${borderRadius.medium} 0 0;

  :focus {
    outline: none;
  }
`;

const drawerOverlayColor = `${colors.black}A0`;
const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  background: ${drawerOverlayColor};
  inset: 0;
`;

function BottomDrawer() {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setSlide(0);
  }, [open]);

  return (
    <Drawer.Root shouldScaleBackground open={open} onOpenChange={setOpen}>
      <Drawer.Trigger aria-label="Instructions">
        <Button icon small>
          <svg
            width="9px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
          </svg>
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <DrawerOverlay />

        <DrawerContent>
          <Center>
            <DragHandle />
          </Center>
          <TitleRow>
            <Title>How to Woggle</Title>
            <Text style="overline">{slide + 1} / 3</Text>
          </TitleRow>

          <InstructionsCarousel slide={slide} onSlideChange={setSlide} />

          <NextButtonContainer>
            {slide === 2 ? (
              <Button fullWidth onClick={() => setOpen(false)}>
                Done
              </Button>
            ) : (
              <Button fullWidth onClick={() => setSlide(slide + 1)}>
                Next
              </Button>
            )}
          </NextButtonContainer>
        </DrawerContent>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default BottomDrawer;
