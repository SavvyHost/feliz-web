"use client";

import { useState, useEffect, useCallback } from 'react';

interface ScrollState {
  prevScrollPos: number;
  visible: boolean;
  scrolledPastThreshold: boolean;
  scrollDirection: 'up' | 'down';
  scrollY: number;
  isAtTop: boolean;
}

const SCROLL_THRESHOLD = 50;
const SCROLL_SENSITIVITY = 5;

export const useScroll = () => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    prevScrollPos: 0,
    visible: true,
    scrolledPastThreshold: false,
    scrollDirection: 'up',
    scrollY: 0,
    isAtTop: true,
  });

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const scrollDifference = currentScrollPos - scrollState.prevScrollPos;

    // Only update if the scroll difference is significant enough
    if (Math.abs(scrollDifference) < SCROLL_SENSITIVITY) return;

    setScrollState((prev) => {
      const scrollingUp = currentScrollPos < prev.prevScrollPos;
      const isAtTop = currentScrollPos < SCROLL_THRESHOLD;

      // Determine visibility based on scroll direction and position
      let newVisible = prev.visible;
      
      if (isAtTop) {
        newVisible = true;
      } else if (scrollingUp) {
        newVisible = true;
      } else if (!scrollingUp && Math.abs(scrollDifference) > SCROLL_SENSITIVITY) {
        newVisible = false;
      }

      return {
        prevScrollPos: currentScrollPos,
        visible: newVisible,
        scrolledPastThreshold: currentScrollPos > SCROLL_THRESHOLD,
        scrollDirection: scrollingUp ? 'up' : 'down',
        scrollY: currentScrollPos,
        isAtTop,
      };
    });
  }, [scrollState.prevScrollPos]);

  useEffect(() => {
    let rafId: number;
    const handleScrollThrottled = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScrollThrottled, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScrollThrottled);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  return scrollState;
};