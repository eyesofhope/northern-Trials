/**
 * Property-Based Tests for Journey Configuration
 * 
 * **Feature: scroll-journey-animation**
 * Tests for Properties 1, 3, 4, 5, 6, 7
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  availableImages,
  destinationImageMap,
  journeyDestinations,
  getImageForDestination,
  imageExists,
  getDestinationsWithImages,
  getDestinationsByDay,
  getCurrentDestination,
  formatLabel,
  calculateStrokeDashoffset,
  getPointAtProgress,
  getRotationAtProgress
} from './journeyConfig.js';

describe('Journey Configuration - Property Tests', () => {
  /**
   * **Feature: scroll-journey-animation, Property 6: Destination-to-Image Mapping**
   * **Validates: Requirements 6.2**
   * 
   * Property: For any destination in the configuration that has a corresponding 
   * image file in the himachal folder, the imagePath property SHALL correctly 
   * reference that image file.
   */
  describe('Property 6: Destination-to-Image Mapping', () => {
    it('every destination with an imagePath should reference an available image', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...getDestinationsWithImages()),
          (destination) => {
            // The imagePath should exist in the available images list
            return availableImages.includes(destination.imagePath);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('every mapped destination ID should have a valid image path', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...Object.keys(destinationImageMap)),
          (destinationId) => {
            const imagePath = getImageForDestination(destinationId);
            // The image path should exist in available images
            return imagePath !== null && availableImages.includes(imagePath);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('destination imagePath should match the destinationImageMap lookup', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...getDestinationsWithImages()),
          (destination) => {
            const mappedImage = destinationImageMap[destination.id];
            // If a mapping exists, it should match the destination's imagePath
            if (mappedImage) {
              return destination.imagePath === mappedImage;
            }
            // If no mapping exists, imagePath should still be valid
            return imageExists(destination.imagePath);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('all image paths in destinations should be valid file references', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...journeyDestinations),
          (destination) => {
            // Either imagePath is null (valid for start/end) or it exists
            return imageExists(destination.imagePath);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: scroll-journey-animation, Property 7: Destination Day Grouping**
   * **Validates: Requirements 6.3**
   * 
   * Property: For any destination in the configuration, the day property SHALL 
   * correctly reflect the tour itinerary day grouping.
   */
  describe('Property 7: Destination Day Grouping', () => {
    // Expected day assignments based on tour itinerary
    const day1Destinations = ['chandigarh', 'bilaspur-lake', 'sundernagar-dam', 'pandoh-dam', 'vaishno-devi', 'rafting', 'paragliding', 'shawls-factory'];
    const day2Destinations = ['nehru-kund', 'solang-valley', 'atal-tunnel', 'mall-road'];
    const day3Destinations = ['jogini-waterfall', 'hadimba-temple', 'manu-temple', 'old-manali', 'vashisht-temple', 'van-vihar'];
    const day4Destinations = ['naggar-castle'];

    it('Day 1 destinations should have day=1', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...day1Destinations),
          (destId) => {
            const dest = journeyDestinations.find(d => d.id === destId);
            return dest && dest.day === 1;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Day 2 destinations should have day=2', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...day2Destinations),
          (destId) => {
            const dest = journeyDestinations.find(d => d.id === destId);
            return dest && dest.day === 2;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Day 3 destinations should have day=3', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...day3Destinations),
          (destId) => {
            const dest = journeyDestinations.find(d => d.id === destId);
            return dest && dest.day === 3;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Day 4 destinations should have day=4', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...day4Destinations),
          (destId) => {
            const dest = journeyDestinations.find(d => d.id === destId);
            return dest && dest.day === 4;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('all destinations should have valid day values (1-4)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...journeyDestinations),
          (destination) => {
            return destination.day >= 1 && destination.day <= 4;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: scroll-journey-animation, Property 1: Scroll-to-Position Mapping**
   * **Validates: Requirements 1.1**
   * 
   * Property: For any scroll progress value between 0 and 1, the bus position 
   * SHALL be monotonically increasing along the path as progress increases.
   */
  describe('Property 1: Scroll-to-Position Mapping', () => {
    // Sample path points for testing (simplified winding road)
    const testPathPoints = [
      { x: 100, y: 20 },
      { x: 50, y: 80 },
      { x: 100, y: 140 },
      { x: 150, y: 200 },
      { x: 100, y: 260 },
      { x: 50, y: 320 },
      { x: 100, y: 380 },
      { x: 150, y: 440 },
      { x: 100, y: 480 }
    ];

    it('progress 0 should return start point', () => {
      const point = getPointAtProgress(0, testPathPoints);
      expect(point.x).toBeCloseTo(testPathPoints[0].x, 1);
      expect(point.y).toBeCloseTo(testPathPoints[0].y, 1);
    });

    it('progress 1 should return end point', () => {
      const point = getPointAtProgress(1, testPathPoints);
      expect(point.x).toBeCloseTo(testPathPoints[testPathPoints.length - 1].x, 1);
      expect(point.y).toBeCloseTo(testPathPoints[testPathPoints.length - 1].y, 1);
    });

    it('position should be monotonically increasing along path for increasing progress', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: Math.fround(0.99), noNaN: true }),
          (progress1) => {
            const progress2 = Math.min(1, progress1 + 0.01);
            const p1 = getPointAtProgress(progress1, testPathPoints);
            const p2 = getPointAtProgress(progress2, testPathPoints);
            
            // For a winding path, we check that the point moves along the path
            // by verifying the y-coordinate generally increases (path goes downward)
            return p2.y >= p1.y - 1; // Allow small tolerance for horizontal segments
          }
        ),
        { numRuns: 100 }
      );
    });

    it('progress values should map to valid coordinates', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: Math.fround(1), noNaN: true }),
          (progress) => {
            const point = getPointAtProgress(progress, testPathPoints);
            return typeof point.x === 'number' && 
                   typeof point.y === 'number' &&
                   !isNaN(point.x) && 
                   !isNaN(point.y);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: scroll-journey-animation, Property 2: Bus Rotation Matches Path Tangent**
   * **Validates: Requirements 1.2**
   * 
   * Property: For any position on the path, the rotation angle SHALL equal 
   * the tangent angle of the path at that point.
   */
  describe('Property 2: Bus Rotation Matches Path Tangent', () => {
    const testPathPoints = [
      { x: 100, y: 20 },
      { x: 50, y: 80 },
      { x: 100, y: 140 },
      { x: 150, y: 200 },
      { x: 100, y: 260 }
    ];

    it('rotation should return valid angle in degrees', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: Math.fround(1), noNaN: true }),
          (progress) => {
            const rotation = getRotationAtProgress(progress, testPathPoints);
            return typeof rotation === 'number' && 
                   !isNaN(rotation) &&
                   rotation >= -180 && 
                   rotation <= 180;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('rotation should reflect path direction changes', () => {
      // At different points on a winding path, rotation should vary
      const rotations = [0.1, 0.3, 0.5, 0.7, 0.9].map(p => 
        getRotationAtProgress(p, testPathPoints)
      );
      
      // Check that rotations are not all the same (path winds)
      const uniqueRotations = new Set(rotations.map(r => Math.round(r)));
      expect(uniqueRotations.size).toBeGreaterThan(1);
    });

    it('rotation at start should point toward second point', () => {
      const rotation = getRotationAtProgress(0, testPathPoints);
      // Path goes from (100,20) toward (50,80) - down and left
      // Expected angle should be roughly between 90 and 180 degrees (pointing down-left)
      expect(rotation).toBeGreaterThan(90);
      expect(rotation).toBeLessThan(180);
    });
  });

  /**
   * **Feature: scroll-journey-animation, Property 5: Road Stroke Progress Mapping**
   * **Validates: Requirements 4.1**
   * 
   * Property: For any scroll progress value P, the road stroke dashoffset SHALL 
   * be calculated such that exactly P proportion of the total path length is visible.
   */
  describe('Property 5: Road Stroke Progress Mapping', () => {
    const testPathLength = 1000;

    it('progress 0 should have full dashoffset (nothing visible)', () => {
      const offset = calculateStrokeDashoffset(0, testPathLength);
      expect(offset).toBe(testPathLength);
    });

    it('progress 1 should have zero dashoffset (fully visible)', () => {
      const offset = calculateStrokeDashoffset(1, testPathLength);
      expect(offset).toBe(0);
    });

    it('dashoffset should decrease linearly with progress', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: Math.fround(1), noNaN: true }),
          fc.float({ min: Math.fround(100), max: Math.fround(10000), noNaN: true }),
          (progress, pathLength) => {
            const offset = calculateStrokeDashoffset(progress, pathLength);
            const expectedOffset = pathLength * (1 - progress);
            return Math.abs(offset - expectedOffset) < 0.01;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('visible portion should equal progress * pathLength', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: Math.fround(1), noNaN: true }),
          fc.float({ min: Math.fround(100), max: Math.fround(10000), noNaN: true }),
          (progress, pathLength) => {
            const offset = calculateStrokeDashoffset(progress, pathLength);
            const visibleLength = pathLength - offset;
            const expectedVisible = progress * pathLength;
            return Math.abs(visibleLength - expectedVisible) < 0.01;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: scroll-journey-animation, Property 3: Background Selection Consistency**
   * **Validates: Requirements 2.1, 2.3**
   * 
   * Property: For any scroll progress value, the background image displayed SHALL 
   * correspond to the most recently passed destination marker.
   */
  describe('Property 3: Background Selection Consistency', () => {
    it('progress 0 should return first destination', () => {
      const dest = getCurrentDestination(0);
      expect(dest.id).toBe('chandigarh');
    });

    it('progress 1 should return last destination', () => {
      const dest = getCurrentDestination(1);
      expect(dest.id).toBe('naggar-castle');
    });

    it('should return most recently passed destination for any progress', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: Math.fround(1), noNaN: true }),
          (progress) => {
            const dest = getCurrentDestination(progress);
            
            // Verify dest.progress <= progress
            if (dest.progress > progress) return false;
            
            // Verify no other destination with higher progress exists that is still <= progress
            const higherDests = journeyDestinations.filter(d => 
              d.progress > dest.progress && d.progress <= progress
            );
            
            return higherDests.length === 0;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('destination should change at correct progress thresholds', () => {
      // Test specific threshold crossings
      const testCases = [
        { progress: 0.04, expectedId: 'chandigarh' },
        { progress: 0.05, expectedId: 'bilaspur-lake' },
        { progress: 0.09, expectedId: 'bilaspur-lake' },
        { progress: 0.10, expectedId: 'sundernagar-dam' },
        { progress: 0.99, expectedId: 'van-vihar' },
        { progress: 1.0, expectedId: 'naggar-castle' }
      ];

      testCases.forEach(({ progress, expectedId }) => {
        const dest = getCurrentDestination(progress);
        expect(dest.id).toBe(expectedId);
      });
    });
  });

  /**
   * **Feature: scroll-journey-animation, Property 4: Label Format Correctness**
   * **Validates: Requirements 3.3**
   * 
   * Property: For any destination object, the formatted label SHALL contain 
   * both the day number and the place name in the format "Day {day} - {name}".
   */
  describe('Property 4: Label Format Correctness', () => {
    it('label should contain day number and place name', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...journeyDestinations),
          (destination) => {
            const label = formatLabel(destination);
            return label.includes(`Day ${destination.day}`) && 
                   label.includes(destination.name);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('label should follow exact format "Day X - Name"', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...journeyDestinations),
          (destination) => {
            const label = formatLabel(destination);
            const expectedLabel = `Day ${destination.day} - ${destination.name}`;
            return label === expectedLabel;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('label should work with arbitrary destination objects', () => {
      fc.assert(
        fc.property(
          fc.record({
            day: fc.integer({ min: 1, max: 10 }),
            name: fc.string({ minLength: 1, maxLength: 50 })
          }),
          (destination) => {
            const label = formatLabel(destination);
            return label === `Day ${destination.day} - ${destination.name}`;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
