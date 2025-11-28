/**
 * Journey Configuration Module
 * Contains destination data and mapping functions for the scroll journey animation
 */

// Available images in the images folder (normalized to lowercase for comparison)
const availableImages = [
  'images/Atal Tunnel.jpeg',
  'images/Bilaspur Lake.jpeg',
  'images/Hadimba Devi Temple.jpeg',
  'images/Jogini Waterfall.jpeg',
  'images/Mall Road.jpeg',
  'images/Manu Temple.jpeg',
  'images/naggar castle.jpeg',
  'images/Nehru Kund.jpeg',
  'images/Old Manali.jpeg',
  'images/Pandoh Dam.jpeg',
  'images/Paragliding.jpeg',
  'images/Rafting.jpeg',
  'images/Shawls Factory.jpeg',
  'images/Sissu.jpeg',
  'images/Solang Valley.jpeg',
  'images/Sundernagar Lake.jpeg',
  'images/Tibetan Monastery.jpeg',
  'images/Vaishno Devi Temple.jpeg',
  'images/Van Vihar.jpeg',
  'images/Vashisht Temple.jpeg'
];

// Destination to image mapping
const destinationImageMap = {
  'bilaspur-lake': 'images/Bilaspur Lake.jpeg',
  'sundernagar-dam': 'images/Sundernagar Lake.jpeg',
  'pandoh-dam': 'images/Pandoh Dam.jpeg',
  'vaishno-devi': 'images/Vaishno Devi Temple.jpeg',
  'rafting': 'images/Rafting.jpeg',
  'paragliding': 'images/Paragliding.jpeg',
  'shawls-factory': 'images/Shawls Factory.jpeg',
  'nehru-kund': 'images/Nehru Kund.jpeg',
  'solang-valley': 'images/Solang Valley.jpeg',
  'atal-tunnel': 'images/Atal Tunnel.jpeg',
  'mall-road': 'images/Mall Road.jpeg',
  'jogini-waterfall': 'images/Jogini Waterfall.jpeg',
  'hadimba-temple': 'images/Hadimba Devi Temple.jpeg',
  'manu-temple': 'images/Manu Temple.jpeg',
  'old-manali': 'images/Old Manali.jpeg',
  'vashisht-temple': 'images/Vashisht Temple.jpeg',
  'van-vihar': 'images/Van Vihar.jpeg',
  'naggar-castle': 'images/naggar castle.jpeg'
};


// Journey destinations configuration
const journeyDestinations = [
  { id: 'chandigarh', name: 'Chandigarh', day: 1, progress: 0, imagePath: null },
  { id: 'bilaspur-lake', name: 'Bilaspur Lake', day: 1, progress: 0.05, imagePath: 'images/Bilaspur Lake.jpeg' },
  { id: 'sundernagar-dam', name: 'Sundernagar Dam', day: 1, progress: 0.10, imagePath: 'images/Sundernagar Lake.jpeg' },
  { id: 'pandoh-dam', name: 'Pandoh Dam', day: 1, progress: 0.15, imagePath: 'images/Pandoh Dam.jpeg' },
  { id: 'vaishno-devi', name: 'Vaishno Devi Temple', day: 1, progress: 0.20, imagePath: 'images/Vaishno Devi Temple.jpeg' },
  { id: 'rafting', name: 'River Rafting', day: 1, progress: 0.25, imagePath: 'images/Rafting.jpeg' },
  { id: 'paragliding', name: 'Paragliding', day: 1, progress: 0.30, imagePath: 'images/Paragliding.jpeg' },
  { id: 'shawls-factory', name: 'Shawls Factory', day: 1, progress: 0.35, imagePath: 'images/Shawls Factory.jpeg' },
  { id: 'nehru-kund', name: 'Nehru Kund', day: 2, progress: 0.42, imagePath: 'images/Nehru Kund.jpeg' },
  { id: 'solang-valley', name: 'Solang Valley', day: 2, progress: 0.50, imagePath: 'images/Solang Valley.jpeg' },
  { id: 'atal-tunnel', name: 'Atal Tunnel', day: 2, progress: 0.58, imagePath: 'images/Atal Tunnel.jpeg' },
  { id: 'mall-road', name: 'Mall Road', day: 2, progress: 0.65, imagePath: 'images/Mall Road.jpeg' },
  { id: 'jogini-waterfall', name: 'Jogini Waterfall', day: 3, progress: 0.72, imagePath: 'images/Jogini Waterfall.jpeg' },
  { id: 'hadimba-temple', name: 'Hadimba Devi Temple', day: 3, progress: 0.78, imagePath: 'images/Hadimba Devi Temple.jpeg' },
  { id: 'manu-temple', name: 'Manu Temple', day: 3, progress: 0.82, imagePath: 'images/Manu Temple.jpeg' },
  { id: 'old-manali', name: 'Old Manali', day: 3, progress: 0.86, imagePath: 'images/Old Manali.jpeg' },
  { id: 'vashisht-temple', name: 'Vashisht Temple', day: 3, progress: 0.90, imagePath: 'images/Vashisht Temple.jpeg' },
  { id: 'van-vihar', name: 'Van Vihar', day: 3, progress: 0.94, imagePath: 'images/Van Vihar.jpeg' },
  { id: 'naggar-castle', name: 'Naggar Castle', day: 4, progress: 1.0, imagePath: 'images/naggar castle.jpeg' }
];

/**
 * Get the image path for a destination
 * @param {string} destinationId - The destination ID
 * @returns {string|null} - The image path or null if no image
 */
function getImageForDestination(destinationId) {
  return destinationImageMap[destinationId] || null;
}

/**
 * Check if an image path exists in available images
 * @param {string} imagePath - The image path to check
 * @returns {boolean} - True if image exists
 */
function imageExists(imagePath) {
  if (!imagePath) return true; // null is valid for destinations without images
  return availableImages.includes(imagePath);
}

/**
 * Get all destinations with their image mappings
 * @returns {Array} - Array of destination objects
 */
function getDestinations() {
  return journeyDestinations;
}

/**
 * Get destinations that should have images (excludes start/end points)
 * @returns {Array} - Array of destinations with images
 */
function getDestinationsWithImages() {
  return journeyDestinations.filter(d => d.imagePath !== null);
}

/**
 * Get destinations grouped by day
 * @returns {Object} - Object with day numbers as keys and destination arrays as values
 */
function getDestinationsByDay() {
  const byDay = {};
  journeyDestinations.forEach(dest => {
    if (!byDay[dest.day]) {
      byDay[dest.day] = [];
    }
    byDay[dest.day].push(dest);
  });
  return byDay;
}

/**
 * Get the current destination based on scroll progress
 * Returns the most recently passed destination
 * @param {number} progress - Scroll progress value (0-1)
 * @returns {Object} - The current destination object
 */
function getCurrentDestination(progress) {
  // Clamp progress to valid range
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  let current = journeyDestinations[0];
  for (let i = journeyDestinations.length - 1; i >= 0; i--) {
    if (clampedProgress >= journeyDestinations[i].progress) {
      current = journeyDestinations[i];
      break;
    }
  }
  return current;
}

/**
 * Format a destination label as "Day X - Name"
 * @param {Object} destination - The destination object
 * @returns {string} - Formatted label string
 */
function formatLabel(destination) {
  return `Day ${destination.day} - ${destination.name}`;
}

/**
 * Calculate stroke dashoffset for road progress animation
 * @param {number} progress - Scroll progress value (0-1)
 * @param {number} pathLength - Total length of the SVG path
 * @returns {number} - The stroke-dashoffset value
 */
function calculateStrokeDashoffset(progress, pathLength) {
  // Clamp progress to valid range
  const clampedProgress = Math.max(0, Math.min(1, progress));
  return pathLength * (1 - clampedProgress);
}

/**
 * Get point coordinates at a given progress along a path
 * This is a pure function version for testing - actual DOM version uses SVG methods
 * @param {number} progress - Progress value (0-1)
 * @param {Array} pathPoints - Array of {x, y} points defining the path
 * @returns {Object} - {x, y} coordinates at the progress point
 */
function getPointAtProgress(progress, pathPoints) {
  if (!pathPoints || pathPoints.length < 2) {
    return { x: 0, y: 0 };
  }
  
  // Clamp progress to valid range
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  // Calculate total path length
  let totalLength = 0;
  const segmentLengths = [];
  for (let i = 1; i < pathPoints.length; i++) {
    const dx = pathPoints[i].x - pathPoints[i-1].x;
    const dy = pathPoints[i].y - pathPoints[i-1].y;
    const length = Math.sqrt(dx * dx + dy * dy);
    segmentLengths.push(length);
    totalLength += length;
  }
  
  // Find the point at the given progress
  const targetLength = clampedProgress * totalLength;
  let accumulatedLength = 0;
  
  for (let i = 0; i < segmentLengths.length; i++) {
    if (accumulatedLength + segmentLengths[i] >= targetLength) {
      // Interpolate within this segment
      const segmentProgress = (targetLength - accumulatedLength) / segmentLengths[i];
      const x = pathPoints[i].x + segmentProgress * (pathPoints[i+1].x - pathPoints[i].x);
      const y = pathPoints[i].y + segmentProgress * (pathPoints[i+1].y - pathPoints[i].y);
      return { x, y };
    }
    accumulatedLength += segmentLengths[i];
  }
  
  // Return last point if at end
  return pathPoints[pathPoints.length - 1];
}

/**
 * Get rotation angle at a given progress along a path (tangent angle)
 * @param {number} progress - Progress value (0-1)
 * @param {Array} pathPoints - Array of {x, y} points defining the path
 * @returns {number} - Rotation angle in degrees
 */
function getRotationAtProgress(progress, pathPoints) {
  if (!pathPoints || pathPoints.length < 2) {
    return 0;
  }
  
  // Get points slightly before and after to calculate tangent
  const delta = 0.01;
  const p1 = getPointAtProgress(Math.max(0, progress - delta), pathPoints);
  const p2 = getPointAtProgress(Math.min(1, progress + delta), pathPoints);
  
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}

module.exports = {
  availableImages,
  destinationImageMap,
  journeyDestinations,
  getImageForDestination,
  imageExists,
  getDestinations,
  getDestinationsWithImages,
  getDestinationsByDay,
  getCurrentDestination,
  formatLabel,
  calculateStrokeDashoffset,
  getPointAtProgress,
  getRotationAtProgress
};
