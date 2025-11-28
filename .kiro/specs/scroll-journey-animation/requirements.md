# Requirements Document

## Introduction

This feature implements an immersive scroll-driven journey animation for the tour details page. As users scroll down the page, a bus icon travels along a winding road path, and the background image transitions to show each destination along the Chandigarh to Manali route. The animation creates a visual storytelling experience that guides users through the tour itinerary.

## Glossary

- **Journey_Animation_System**: The scroll-driven animation component that coordinates bus movement, road progression, and background transitions
- **Bus_Element**: An animated vehicle icon that moves along the road path based on scroll position
- **Road_Path**: A visual SVG path representing the winding mountain road from Chandigarh to Manali
- **Destination_Marker**: A labeled point on the road indicating a specific tour stop with associated background image
- **Background_Layer**: The full-screen image layer that transitions between destination photos as the bus reaches each location
- **Scroll_Progress**: A normalized value (0-1) representing how far the user has scrolled through the journey section
- **Day_Section**: A grouping of destinations that belong to the same day of the tour itinerary

## Requirements

### Requirement 1

**User Story:** As a visitor, I want to see a bus move along a road as I scroll, so that I can visualize the journey from Chandigarh to Manali.

#### Acceptance Criteria

1. WHEN the user scrolls within the journey section THEN the Journey_Animation_System SHALL move the Bus_Element along the Road_Path proportionally to the Scroll_Progress
2. WHEN the Bus_Element moves along the Road_Path THEN the Journey_Animation_System SHALL rotate the Bus_Element to match the road direction at that point
3. WHILE the user is not scrolling THEN the Bus_Element SHALL remain stationary at its current position on the Road_Path
4. WHEN the journey section enters the viewport THEN the Bus_Element SHALL be positioned at the starting point (Chandigarh)
5. WHEN the user scrolls to the end of the journey section THEN the Bus_Element SHALL reach the final destination marker

### Requirement 2

**User Story:** As a visitor, I want the background image to change as the bus reaches each destination, so that I can see photos of each place along the route.

#### Acceptance Criteria

1. WHEN the Bus_Element reaches a Destination_Marker THEN the Journey_Animation_System SHALL transition the Background_Layer to display the corresponding destination image
2. WHEN transitioning between destination images THEN the Background_Layer SHALL use a smooth crossfade animation lasting between 300-500 milliseconds
3. WHILE the Bus_Element is between two Destination_Markers THEN the Background_Layer SHALL display the image of the most recently passed destination
4. WHEN the journey section first loads THEN the Background_Layer SHALL display the Chandigarh starting point image

### Requirement 3

**User Story:** As a visitor, I want to see destination labels appear as the bus reaches each stop, so that I know which place I'm viewing.

#### Acceptance Criteria

1. WHEN the Bus_Element reaches a Destination_Marker THEN the Journey_Animation_System SHALL display the destination name label with a fade-in animation
2. WHEN the Bus_Element passes a Destination_Marker THEN the Journey_Animation_System SHALL fade out the previous destination label
3. WHEN displaying a destination label THEN the Journey_Animation_System SHALL show the day number and place name (e.g., "Day 1 - Bilaspur Lake")

### Requirement 4

**User Story:** As a visitor, I want the road path to be visually drawn as the bus progresses, so that I can see the route being traced.

#### Acceptance Criteria

1. WHEN the Bus_Element moves along the Road_Path THEN the Journey_Animation_System SHALL animate the road stroke to appear drawn from start to the bus position
2. WHILE the Bus_Element is at a position on the Road_Path THEN the road segment behind the bus SHALL be fully visible and the segment ahead SHALL be partially visible or dimmed
3. WHEN the journey section loads THEN the Road_Path SHALL display a faint outline of the complete route

### Requirement 5

**User Story:** As a visitor on a mobile device, I want the scroll animation to work smoothly on touch screens, so that I can experience the journey on any device.

#### Acceptance Criteria

1. WHEN the user scrolls on a touch device THEN the Journey_Animation_System SHALL respond to touch scroll events with the same behavior as desktop scroll
2. WHILE the animation is running THEN the Journey_Animation_System SHALL maintain a minimum frame rate of 30fps on mobile devices
3. WHEN the viewport width is less than 768 pixels THEN the Journey_Animation_System SHALL adjust the layout to a vertical orientation suitable for mobile viewing

### Requirement 6

**User Story:** As a visitor, I want the animation to include all tour destinations in the correct order, so that the journey matches the actual itinerary.

#### Acceptance Criteria

1. WHEN configuring the journey THEN the Journey_Animation_System SHALL include the following destinations in order: Chandigarh (start), Bilaspur Lake, Sundernagar Dam, Pandoh Dam, Kullu, Manali, Solang Valley, Atal Tunnel, and additional Day 3-4 destinations
2. WHEN a destination has an available image in the himachal folder THEN the Journey_Animation_System SHALL use that image for the Background_Layer transition
3. WHEN displaying destinations THEN the Journey_Animation_System SHALL group them by day according to the tour itinerary

### Requirement 7

**User Story:** As a visitor, I want visual feedback showing my scroll progress through the journey, so that I know how much of the tour I've explored.

#### Acceptance Criteria

1. WHEN the user scrolls through the journey section THEN the Journey_Animation_System SHALL display a progress indicator showing the percentage of the journey completed
2. WHEN the Bus_Element reaches a Destination_Marker THEN the Journey_Animation_System SHALL highlight that marker on the progress indicator
3. WHILE scrolling THEN the progress indicator SHALL update in real-time to reflect the current Scroll_Progress
