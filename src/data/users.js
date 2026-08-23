// Robert's POV - Users for the dating flow
// Import local images
import livImage from '../assets/liv-profile.jpg';
import cierraImage from '../assets/cierra-profile.jpg';
import beauImage from '../assets/beau-profile.jpg';
import dedeImage from '../assets/dede-profile.jpg';

export const users = [
  {
    id: 1,
    name: 'Liv',
    age: 26,
    image: livImage,
    distance: 5,
    truthsAndLie: {
      header: 'Two truths & a lie...',
      text: 'I once swam with sharks in Australia. I can solve a Rubik\'s cube in under 30 seconds. I was an extra in a Marvel movie.'
    }
  },
  {
    id: 2,
    name: 'Cierra',
    age: 24,
    image: cierraImage,
    distance: 7,
    truthsAndLie: {
      header: 'Two truths & a lie...',
      text: 'I have a black belt in karate. I\'ve visited 15 countries. I can play the piano blindfolded.'
    }
  },
  {
    id: 3,
    name: 'Beau',
    age: 25,
    image: beauImage,
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
    image: dedeImage,
    distance: 10,
    truthsAndLie: {
      header: '2 truths and a lie:',
      text: 'I\'m double jointed. My cat is in an extremely popular meme. I was bitten by a dolphin in Maui.'
    }
  }
];
