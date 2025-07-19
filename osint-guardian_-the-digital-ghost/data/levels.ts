
import { Level } from '../types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'The Golden Gate',
    scenario: 'An anonymous source sent this photo. They claim it was taken recently in a major European city. Verify the location.',
    imageUrls: ['https://picsum.photos/seed/ggb-sf/1200/800'], // A picture that will likely look like the Golden Gate Bridge
    questions: [
      { id: 1, text: 'What city is depicted in the image?', answer: 'San Francisco' },
      { id: 2, text: 'What is the name of the bridge?', answer: 'Golden Gate Bridge' },
    ],
    hints: [
      'The bridge color is called "International Orange".',
      'This city is known for its cable cars and steep hills.',
      'Use the Reverse Image Search tool.'
    ],
  },
  {
    id: 2,
    title: 'The Vlogger\'s View',
    scenario: 'A travel vlogger posted this picture from their hotel room. We need to identify the hotel to understand their itinerary. The post text was unhelpful, but the window reflection might hold a clue.',
    imageUrls: ['https://picsum.photos/seed/tokyo-view/1200/800'], // A city view, ideally one that could be Tokyo
    questions: [
      { id: 1, text: 'What famous tower is visible in the reflection?', answer: 'Tokyo Tower' },
      { id: 2, text: 'Based on the tower, what city is the vlogger in?', answer: 'Tokyo' },
    ],
    hints: [
      'Look closely at the reflection in the window.',
      'The tower is a famous landmark in a major Asian capital, known for its red and white lattice structure.',
      'The EXIF data might contain a clue about the camera used, which is popular with travel vloggers.'
    ],
  },
  {
    id: 3,
    title: 'The Courier\'s Drop',
    scenario: 'This image was intercepted from a message detailing a dead drop location. We need to find the exact street for surveillance. The license plate has been digitally scrubbed.',
    imageUrls: ['https://picsum.photos/seed/london-street/1200/800'], // A street scene, ideally one that could be London
    questions: [
      { id: 1, text: 'What is the name of the street visible on the sign?', answer: 'Abbey Road' },
      { id: 2, text: 'What color is the public phone booth?', answer: 'Red' },
      { id: 3, text: 'What city is this famous street in?', answer: 'London' }
    ],
    hints: [
      'There is a street sign partially visible behind the tree.',
      'This street was made famous by a world-renowned rock band.',
      'Use the Map Triangulator tool to explore famous streets in major world cities.'
    ],
  },
  {
    id: 4,
    title: 'The Rooftop Meeting',
    scenario: "We've intercepted two images from a clandestine meeting. One shows a wide city view from a rooftop, the other a close-up of a unique sculpture on that same rooftop. Identify their location.",
    imageUrls: [
        'https://picsum.photos/seed/rooftop-panorama/1200/800', // Chicago skyline
        'https://picsum.photos/seed/rooftop-object/600/400' // 'The Bean'
    ],
    questions: [
      { id: 1, text: 'What city is shown in the panoramic view?', answer: 'Chicago' },
      { id: 2, text: "What is the famous sculpture nicknamed 'The Bean' officially called?", answer: 'Cloud Gate' },
      { id: 3, text: 'The meeting took place on a rooftop near what park?', answer: 'Millennium Park' },
    ],
    hints: [
      'The architecture in the panoramic view is distinctive of a major US city known for its skyscrapers.',
      'The unique, reflective sculpture is a very famous tourist attraction.',
      'Use Reverse Image Search on both images to gather different sets of clues.'
    ],
  },
  {
    id: 5,
    title: 'The Scattered Postcards',
    scenario: "A person of interest is traveling through Europe. They sent three postcards to a contact, but with no message. We believe they are all from the same city. Where are they?",
    imageUrls: [
        'https://picsum.photos/seed/rome-postcard1/800/600', // Colosseum
        'https://picsum.photos/seed/rome-postcard2/800/600', // Trevi Fountain
        'https://picsum.photos/seed/rome-postcard3/800/600' // Pantheon
    ],
    questions: [
      { id: 1, text: 'What ancient amphitheater is shown in one of the postcards?', answer: 'Colosseum' },
      { id: 2, text: 'What famous fountain, where people toss coins, is depicted?', answer: 'Trevi Fountain' },
      { id: 3, text: 'What city are all these landmarks in?', answer: 'Rome' },
    ],
    hints: [
      'All three landmarks are ancient and located in a European capital.',
      "One of the structures was a former Roman temple, now a church.",
      "This city is often called 'The Eternal City'."
    ],
  },
];
