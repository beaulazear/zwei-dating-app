// Robert's POV - Users for the dating flow
// Import local images
import mockImage from '../assets/Mock.jpg';

export const users = [
  {
    id: 1,
    name: 'Jessica',
    age: 27,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    distance: 4,
    truthsAndLie: {
      header: 'Two truths & a lie...',
      text: 'I once climbed Mount Kilimanjaro. I can speak three languages fluently. I was a backup dancer for Beyoncé.'
    }
  },
  {
    id: 2,
    name: 'Sarah',
    age: 25,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    distance: 6,
    truthsAndLie: {
      header: 'Two truths & a lie...',
      text: 'I have a pet snake named Monty. I was born on a cruise ship. I make the best chocolate chip cookies you\'ll ever taste.'
    }
  },
  {
    id: 3,
    name: 'Beau',
    age: 25,
    image: mockImage,
    distance: 3,
    truthsAndLie: {
      header: 'Two truths & a lie...',
      text: 'I was a Gerber baby. I once won a regional hot dog eating competition. Chrissy Teigen used my banana bread recipe on her secret food blog'
    }
  },
  {
    id: 4,
    name: 'Dede',
    age: 23,
    image: mockImage,
    distance: 10,
    truthsAndLie: {
      header: '2 truths and a lie:',
      text: 'I\'m double jointed. My cat is in an extremely popular meme. I was bitten by a dolphin in Maui.'
    }
  }
];
